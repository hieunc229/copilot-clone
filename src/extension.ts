import * as vscode from "vscode";

import { search } from "./utils/search";
import { predict } from "./utils/predict";
import { matchSearchPhrase } from "./utils/matchSearchPhrase";
import { loadModel } from "./model_server/loadModel";
import { forceRender } from "./utils/forceRender";

loadModel();

export function activate(context: vscode.ExtensionContext) {
  let sendPrediction = false;
  const sendPredictionCommand = "maverick.sendPrediction";
  const sendPredictionCommandHandler = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    sendPrediction = true;

    // force re-render so prediction sends
    forceRender(editor);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(
      sendPredictionCommand,
      sendPredictionCommandHandler
    )
  );
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
      let rs;

      if (match) {
        try {
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
        } catch (err: any) {
          vscode.window.showErrorMessage(err.toString());
        }
      }

      // Trigger model prediction on given line with document text as context.
      if (sendPrediction) {
        try {
          sendPrediction = false;
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
