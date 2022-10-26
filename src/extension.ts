import * as vscode from "vscode";

import { exec } from "child_process";
import fetch from "node-fetch";
import * as path from "path";

import { search } from "./utils/search";
import { predict } from "./utils/predict";
import { matchSearchPhrase } from "./utils/matchSearchPhrase";
import { loadModel } from "./utils/loadModel";

loadModel();

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
            const documentText = document.getText();
            rs = await predict(documentText);
            items = rs.map((item: any) => {
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
