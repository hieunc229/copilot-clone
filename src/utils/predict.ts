import * as vscode from "vscode";
import fetch from "node-fetch";

import { getConfig } from "../config";

export async function predict(documentText: string): Promise<string[]> {
  const disposable = vscode.window.setStatusBarMessage(
    "Maverick generating code..."
  );
  const config = getConfig();
  const response = await fetch(`http://localhost:${config.settings.port}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: documentText,
      numTokens: config.settings.maxTokens,
    }),
  });
  const result = await response.json();
  disposable.dispose();
  return result.text;
}
