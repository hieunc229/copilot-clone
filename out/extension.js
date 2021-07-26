"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
const search_1 = require("./utils/search");
function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.captain-stack-settings', () => {
        vscode.window.showInformationMessage('Show settings');
    });
    context.subscriptions.push(disposable);
    const provider = {
        provideInlineCompletionItems: async (document, position, context, token) => {
            const textBeforeCursor = document.getText(new vscode.Range(position.with(undefined, 0), position));
            let searchPhrase = matchPhrase(textBeforeCursor);
            if (searchPhrase) {
                let rs;
                try {
                    rs = await search_1.search(textBeforeCursor);
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
                    const output = `\n// Source: https://stackoverflow.com${item.sourceURL}\n${item.code}`;
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
/**
 * Match the giving string with search pattern
 * @param input
 * @returns search pharse or undefined
 */
function matchPhrase(input) {
    let match = config_1.default.SEARCH_PATTERN.exec(input);
    return match && match.length ? match[1] : undefined;
}
