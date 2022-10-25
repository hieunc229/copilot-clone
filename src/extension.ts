import * as vscode from "vscode";

import { exec } from "child_process";
import fetch from "node-fetch";
import * as path from "path";

import { search } from "./utils/search";
import { matchSearchPhrase } from "./utils/matchSearchPhrase";

const modelServerExc = path.resolve(__dirname, "dist/model/model");
exec(modelServerExc, (error, stdout, stderr) => {
  console.log(error);
});

vscode.window.showInformationMessage(
  "Maverick launching on port 9401. Please wait a few minutes for Maverick to load and configure."
);

export function activate(context: vscode.ExtensionContext) {
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
            const response = await fetch("http://localhost:9401", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: documentText, numTokens: 64 }),
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
