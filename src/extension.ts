import * as vscode from 'vscode';
import CSConfig from './config';
import { search } from './utils/search';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'extension.captain-stack-settings',
		() => {
			vscode.window.showInformationMessage('Show settings');
		}
	);

	context.subscriptions.push(disposable);

	interface CustomInlineCompletionItem extends vscode.InlineCompletionItem {
		trackingId: string;
	}

	const provider: vscode.InlineCompletionItemProvider<CustomInlineCompletionItem> = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const textBeforeCursor = document.getText(
				new vscode.Range(position.with(undefined, 0), position)
			);

			if (textBeforeCursor.indexOf(CSConfig.SEARCH_PHRASE_START) == 0 && textBeforeCursor[textBeforeCursor.length - 1] === CSConfig.SEARCH_PHRASE_END) {

				let rs;

				try {
					rs = await search(textBeforeCursor);
				} catch (err) {
					vscode.window.showErrorMessage(err.toString());
					return { items:[] };
				}


				if (rs == null) {
					return { items: [] };
				}

				const items = new Array<CustomInlineCompletionItem>();

				rs.results.forEach((item, i) => {

					const output = `\n// Source: https://stackoverflow.com${item.sourceURL}\n${item.code}`;
					items.push({
						text: output,
						range: new vscode.Range(position.translate(0, output.length), position),
						trackingId: `snippet-${i}`,
					});
				});
				return { items };
			}
			return { items: [] };
		},
	};

	vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);

	// Be aware that the API around `getInlineCompletionItemController` will not be finalized as is!
	vscode.window.getInlineCompletionItemController(provider).onDidShowCompletionItem(e => {
		const id = e.completionItem.trackingId;
	});
}
