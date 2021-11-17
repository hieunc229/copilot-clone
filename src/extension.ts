import * as vscode from 'vscode';

import { sample } from './sample';

export function activate(_: vscode.ExtensionContext) {

	const provider: vscode.InlineCompletionItemProvider<vscode.InlineCompletionItem> = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const textBeforeCursor = document.getText(
				new vscode.Range(position.with(undefined, 0), position)
			);

			if (textBeforeCursor) {

				let rs;

				try {
					rs = await sample(textBeforeCursor);
				} catch (err) {
					vscode.window.showErrorMessage(err.toString());
					return { items: [] };
				}

				if (rs == null) {
					return { items: [] };
				}

				const items = rs.results.map(item => {
					const output = item.code;
					return {
						text: output,
						range: new vscode.Range(position.translate(0, output.length), position)
					} as vscode.InlineCompletionItem;
				});

				return { items };
			}

			return { items: [] };
		},
	};

	vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
