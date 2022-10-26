import * as vscode from "vscode";

export function forceRender(editor: vscode.TextEditor) {
  const startPos = new vscode.Position(0, 0);
  const endPos = new vscode.Position(0, 1);
  const range = new vscode.Range(startPos, endPos);
  const textAtRange = editor.document.getText(range);
  editor.edit((editBuilder) => {
    editBuilder.replace(range, textAtRange);
  });
}
