import * as vscode from 'vscode';

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

export function activate(_: vscode.ExtensionContext) {

    const provider: vscode.CompletionItemProvider = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        provideInlineCompletionItems: async (document, position, context, token) => {

            const textBeforeCursor = document.getText(
                new vscode.Range(position.with(undefined, 0), position)
            );

            const match = matchSearchPhrase(textBeforeCursor);
            let items: any[] = [];

            if (match) {
                let rs;
                try {
                    rs = await search(match.searchPhrase);
                    if (rs) {
                        items = rs.results.map((item: { sourceURL: any; code: any; }) => {
                            const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                            const completionItem = new vscode.CompletionItem(output);
                            completionItem.insertText = output;
                            return completionItem;
                        });
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
            }
            return {items};
        },
    };
    
    

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
    const openSettingsCommand = vscode.commands.registerCommand('captainStack.openSettings', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', '@ext:captainstack.captain-stack');
      });
      
      const statusBarSettings = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
      statusBarSettings.command = 'captainStack.openSettings';
      statusBarSettings.text = '$(gear) CaptainStack';
      statusBarSettings.tooltip = 'Open CaptainStack Settings';
      statusBarSettings.show();
      
      _.subscriptions.push(openSettingsCommand, statusBarSettings);
}
