import * as vscode from 'vscode';
import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';
import { updateStatusBarMessage, statusBarMessage } from './utils/statusBarMessage';

export function activate(_: vscode.ExtensionContext) {
  updateStatusBarMessage('CaptainStack: Active');

  const provider: vscode.CompletionItemProvider = {
    provideCompletionItems: async (document, position, token, context) => {
      const textBeforeCursor = document.getText(
        new vscode.Range(position.with(undefined, 0), position)
      );
      const match = matchSearchPhrase(textBeforeCursor);

      let items: vscode.CompletionItem[] = [];
      if (match) {
        let rs;
        try {
          statusBarMessage.text = 'CaptainStack: Generating code...';
          rs = await search(match.searchPhrase);
          if (rs) {
            items = rs.results.map((item) => {
              const output = `${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
              const completionItem = new vscode.CompletionItem(output, vscode.CompletionItemKind.Snippet);
              completionItem.filterText = match.searchPhrase;
              completionItem.detail = item.sourceURL;
              completionItem.documentation = new vscode.MarkdownString(item.code);
              // Define the snippet
              completionItem.insertText = new vscode.SnippetString(item.code);
              completionItem.range = new vscode.Range(
                position.translate(0, -match.searchPhrase.length),
                position
              );
              return completionItem;
            });
          }
        } catch (err: any) {
          vscode.window.showErrorMessage(err.toString());
        } finally {
          statusBarMessage.text = 'CaptainStack: Active';
        }
      }
      return {items};
    }
  };

  vscode.languages.registerCompletionItemProvider({ pattern: "**" }, provider);

  const openSettingsCommand = vscode.commands.registerCommand('captainStack.openSettings', () => {
      vscode.commands.executeCommand('workbench.action.openSettings', '@ext:captainstack.captain-stack');
  });

  const statusBarSettings = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarSettings.command = 'captainStack.openSettings';
  statusBarSettings.text = '$(gear) CaptainStack';
  statusBarSettings.tooltip = 'Open CaptainStack Settings';
  statusBarSettings.show();

  _.subscriptions.push(openSettingsCommand, statusBarSettings, statusBarMessage);
}
