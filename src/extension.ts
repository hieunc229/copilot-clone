import * as vscode from 'vscode';
import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';
import { updateStatusBarMessage, statusBarMessage } from './utils/statusBarMessage';


export function activate(context: vscode.ExtensionContext) {
  //updateStatusBarMessage('captainStack: Active');
  

  const provider: vscode.CompletionItemProvider = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
     provideInlineCompletionItems: async (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) => {
      // console.log("Checking for completion items...");
      const textBeforeCursor = document.getText(
        new vscode.Range(position.with(undefined, 0), position)
      );
      const match = matchSearchPhrase(textBeforeCursor);
      // console.log("Match result:", match);

      let items: any[] = [];
      if (match) {
        let rs;
        try {
          statusBarMessage.text = 'captainStack: Generating code...';
          rs = await search(match.searchPhrase);
          if (rs) {
            // items = rs.results.map((item) => {
            //   const output = `${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
            //   const completionItem = new vscode.CompletionItem(output, vscode.CompletionItemKind.Snippet);
            //   completionItem.filterText = match.searchPhrase;
            //   completionItem.detail = item.sourceURL;
            //   completionItem.documentation = new vscode.MarkdownString(item.code);
            //   // Define the snippet
            //   completionItem.insertText = new vscode.SnippetString(item.code);
            //   completionItem.range = new vscode.Range(
            //     position.translate(0, -match.searchPhrase.length),
            //     position
            //   );
            //   return completionItem;
            // });
            items = rs.results.map(item => {
              const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
              return {
                  text: output,
                  insertText: output,
                  range: new vscode.Range(position.translate(0, output.length), position)
              };
          });
          }
        } catch (err: any) {
          vscode.window.showErrorMessage(err.toString());
        } finally {
          statusBarMessage.text = 'captainStack: Active';
        }
      }
      return {items};
    }
  };

    // const disposable = vscode.languages.registerCompletionItemProvider({ pattern: "**" }, provider);
    // context.subscriptions.push(disposable);

    // Agrega el disposable al contexto de la extensión
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
  vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);

    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // //@ts-ignore
    // vscode.languages.registerInlineCompletionItemProvider(
    //   { pattern: '**' },
    //   {
    //     provideInlineCompletionItems: async (document: any, position: any) => {
    //       return [{ text: '< 2) {\n\treturn 1;\n\t}' }];
    //     },
    //   },
    // );
  

  const openSettingsCommand = vscode.commands.registerCommand('captainStack.openSettings', () => {
      vscode.commands.executeCommand('workbench.action.openSettings', '@ext:captainStack.captain-stack');
  });

  const statusBarSettings = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarSettings.command = 'captainStack.openSettings';
  statusBarSettings.text = '$(gear) captainStack';
  statusBarSettings.tooltip = 'Open captainStack Settings';
  statusBarSettings.show();

  context.subscriptions.push(openSettingsCommand, statusBarSettings, statusBarMessage);
}
