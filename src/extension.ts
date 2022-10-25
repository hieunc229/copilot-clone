import * as vscode from "vscode";

import { exec } from "child_process";
import fetch from "node-fetch";
import * as path from "path";

import { search } from "./utils/search";
import { matchSearchPhrase } from "./utils/matchSearchPhrase";

const modelServerExc = path.resolve(__dirname, "dist/model");

exec(modelServerExc, (error, stdout, stderr) => {
  console.log(error);
});

vscode.window.showInformationMessage(
  "Maverick launching. Please wait ~10 seconds before making requests."
);

export function activate(context: vscode.ExtensionContext) {
  // const command = "extension.generateCode";
  // const commandHandler = () => {
  //   const editor = vscode.window.activeTextEditor;
  //   if (!editor) {
  //     return;
  //   }
  //   // let document = editor.document;
  //   // let curPos = editor.selection.active;
  //   // let offset = document.offsetAt(curPos);
  //   return editor.insertSnippet(
  //     new vscode.SnippetString("def hello_world():"),
  //     new vscode.Position(0, 0)
  //   );
  // };

  // context.subscriptions.push(
  //   vscode.commands.registerCommand(command, commandHandler)
  // );

  const provider: vscode.CompletionItemProvider = {
    // @ts-ignore
    provideInlineCompletionItems: async (
      document: any,
      position: any,
      context: any,
      token: any
    ) => {
      const textBeforeCursor = document.getText(
        new vscode.Range(position.with(undefined, 0), position)
      );

      const match = matchSearchPhrase(textBeforeCursor);
      let items: any[] = [];

      if (match) {
        let rs;
        try {
          if (!(match.commentSyntax && match.commentSyntaxEnd)) {
            // Trigger model prediction on given line
            const disposable = vscode.window.setStatusBarMessage(
              "Maverick generating code..."
            );
            const documentText = document.getText();
            const response = await fetch("http://localhost:5000", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: documentText }),
            });
            const result = await response.json();
            const generatedText = result.text;
            items = generatedText.map((item: any) => {
              const finalText = item.slice(documentText.length, item.length);
              return {
                text: `${finalText}`,
                insertText: `${finalText}`,
                range: new vscode.Range(
                  position.translate(0, finalText.length),
                  position
                ),
              };
            });
            disposable.dispose();
          } else {
            rs = await search(match.searchPhrase);
            if (rs) {
              items = rs.results.map((item) => {
                const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                return {
                  text: output,
                  insertText: output,
                  range: new vscode.Range(
                    position.translate(0, output.length),
                    position
                  ),
                };
              });
            }
          }
        } catch (err: any) {
          vscode.window.showErrorMessage(err.toString());
        }
      }
      return { items };
    },
  };

  // @ts-ignore
  vscode.languages.registerInlineCompletionItemProvider(
    { pattern: "**" },
    provider
  );
}
