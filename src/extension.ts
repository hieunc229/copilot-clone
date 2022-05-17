import * as vscode from 'vscode';

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

export function activate(_: vscode.ExtensionContext) {

	const provider: vscode.InlineCompletionItemProvider<vscode.InlineCompletionItem> = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			const textBeforeCursor = document.getText(
				new vscode.Range(position.with(undefined, 0), position)
			);

			const match = matchSearchPhrase(textBeforeCursor);

			if (match) {

				let rs;

				try {
					rs = await search(match.searchPhrase);
				} catch (err) {
					vscode.window.showErrorMessage(err.toString());
					return { items: [] };
				}

				if (rs == null) {
					return { items: [] };
				}

				const items = rs.results.map(item => {
					const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
					return {
						text: output,
            insertText: output,
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
