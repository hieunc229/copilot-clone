"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const search_1 = require("./utils/search");
const matchSearchPhrase_1 = require("./utils/matchSearchPhrase");
function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.captain-stack-settings', () => {
        vscode.window.showInformationMessage('Show settings');
    });
    context.subscriptions.push(disposable);
    const provider = {
        provideInlineCompletionItems: async (document, position, context, token) => {
            const textBeforeCursor = document.getText(new vscode.Range(position.with(undefined, 0), position));
            const match = matchSearchPhrase_1.matchSearchPhrase(textBeforeCursor);
            if (match) {
                let rs;
                try {
                    rs = await search_1.search(match.searchPhrase);
                }
                catch (err) {
                    vscode.window.showErrorMessage(err.toString());
                    return { items: [] };
                }
                if (rs == null) {
                    return { items: [] };
                }
                const items = new Array();
                rs.results.forEach((item, i) => {
                    const output = `\n${match.commentSyntax} Source: https://stackoverflow.com${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                    items.push({
                        text: output,
                        range: new vscode.Range(position.translate(0, output.length), position),
                        trackingId: `snippet-${i}`,
                    });
                });
                return { items };
            }
            return { items: [] };
        },
    };
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
    // Be aware that the API around `getInlineCompletionItemController` will not be finalized as is!
    vscode.window.getInlineCompletionItemController(provider).onDidShowCompletionItem(e => {
        const id = e.completionItem.trackingId;
    });
}
exports.activate = activate;
