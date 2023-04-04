import * as vscode from 'vscode';

export const statusBarMessage = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

export function updateStatusBarMessage(text: string, duration?: number) {
  statusBarMessage.text = text;

  if (duration) {
    setTimeout(() => {
      statusBarMessage.text = text;
    }, duration);
  }

  statusBarMessage.show();
}
