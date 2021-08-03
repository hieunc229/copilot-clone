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
                const items = rs.results.map(item => {
                    const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                    return {
                        text: output,
                        range: new vscode.Range(position.translate(0, output.length), position)
                    };
                });
                let resultCountSO = 0, resultCountGG = 0;
                for (const i of rs.results) {
                    if (i.sourceURL.includes('stackoverflow.com'))
                        resultCountSO++;
                    else if (i.sourceURL.includes('gist.github.com'))
                        resultCountGG++;
                }
                // TODO: refactor in case of more code sources
                vscode.window.showInformationMessage(`Got ${resultCountSO} results from Stack Overflow, ${resultCountGG} results from Github Gists`);
                return { items };
            }
            return { items: [] };
        },
    };
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
exports.activate = activate;
