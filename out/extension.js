"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
const search_1 = require("./utils/search");
function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.copilot-clone-settings', () => {
        vscode.window.showInformationMessage('Show settings');
    });
    context.subscriptions.push(disposable);
    const provider = {
        provideInlineCompletionItems: (document, position, context, token) => __awaiter(this, void 0, void 0, function* () {
            const textBeforeCursor = document.getText(new vscode.Range(position.with(undefined, 0), position));
            if (textBeforeCursor.indexOf(config_1.default.SEARCH_PHARSE_START) == 0 && textBeforeCursor[textBeforeCursor.length - 1] === config_1.default.SEARCH_PHARSE_END) {
                let rs;
                try {
                    rs = yield search_1.search(textBeforeCursor);
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
        }),
    };
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
    // Be aware that the API around `getInlineCompletionItemController` will not be finalized as is!
    vscode.window.getInlineCompletionItemController(provider).onDidShowCompletionItem(e => {
        const id = e.completionItem.trackingId;
    });
}
exports.activate = activate;
