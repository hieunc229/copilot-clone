import * as vscode from 'vscode';
import { search } from './utils/search';

const KEYWORD = `//find`

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'extension.copilot-clone-settings',
		() => {
			vscode.window.showInformationMessage('Show settings');
		}
	);

	context.subscriptions.push(disposable);

	function longestSuffixPrefixLength(a: string, b: string): number {
		for (let i = Math.min(a.length, b.length); i > 0; i--) {
			if (a.substr(-i) == b.substr(0, i)) {
				return i;
			}
		}
		return 0;
	}

	interface CustomInlineCompletionItem extends vscode.InlineCompletionItem {
		trackingId: string;
	}

	const provider: vscode.InlineCompletionItemProvider<CustomInlineCompletionItem> = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const textBeforeCursor = document.getText(
				new vscode.Range(position.with(undefined, 0), position)
			);

			if (textBeforeCursor.indexOf(KEYWORD) == 0 && textBeforeCursor[textBeforeCursor.length - 1] === ".") {

				let rs;

				try {
					rs = await search(textBeforeCursor)
				} catch (err) {
					vscode.window.showInformationMessage(err.toString());
					return { items:[] }
				}


				if (rs == null) {
					return { items: [] }
				}

				const suggestions = rs.results.map(item => item.code)
				const items = new Array<CustomInlineCompletionItem>();

				suggestions.forEach(code => {
					// const l = longestSuffixPrefixLength(textBeforeCursor, code);
					items.push({
						text: `\n` + code,
						range: new vscode.Range(position.translate(0, code.length + 1), position),
						trackingId: 'some-id',
					});
				})
				return { items };
			}
			return { items: [] }
		},
	};

	vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);

	// Be aware that the API around `getInlineCompletionItemController` will not be finalized as is!
	vscode.window.getInlineCompletionItemController(provider).onDidShowCompletionItem(e => {
		const id = e.completionItem.trackingId;
	});
}
