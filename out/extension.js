"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const sample_1 = require("./sample");
function activate(_) {
    const provider = {
        provideInlineCompletionItems: async (document, position, context, token) => {
            const textBeforeCursor = document.getText(new vscode.Range(position.with(undefined, 0), position));
            if (textBeforeCursor) {
                let rs;
                try {
                    rs = await (0, sample_1.sample)(textBeforeCursor);
                }
                catch (err) {
                    vscode.window.showErrorMessage(err.toString());
                    return { items: [] };
                }
                if (rs == null) {
                    return { items: [] };
                }
                const items = rs.results.map(item => {
                    const output = item.code;
                    return {
                        text: output,
                        range: new vscode.Range(position.translate(0, output.length), position)
                    };
                });
                return { items };
            }
            return { items: [] };
        },
    };
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
exports.activate = activate;
