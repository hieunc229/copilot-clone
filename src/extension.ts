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

			const searchPhrase = matchPhrase(textBeforeCursor);

			if (searchPhrase) {

				let rs;

				try {
					rs = await search(searchPhrase[1]);
				} catch (err) {
					vscode.window.showErrorMessage(err.toString());
					return { items:[] };
				}


				if (rs == null) {
					return { items: [] };
				}

				const items = new Array<CustomInlineCompletionItem>();

				rs.results.forEach((item, i) => {

					const output = `\n${searchPhrase?.[0]} Source: https://stackoverflow.com${item.sourceURL}\n${item.code}`;
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

/**
 * Match the giving string with search pattern
 * @param input
 * @returns search phrase or undefined
 */
function matchPhrase(input: string) {
	const match = CSConfig.SEARCH_PATTERN.exec(input);
	return match ? [match[1], match[2]] : undefined;
}
