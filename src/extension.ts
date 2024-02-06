import * as vscode from 'vscode';

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

let matched = false;
let accepted = false;
let solution: string| null;
let match: any = undefined;

export function activate(_: vscode.ExtensionContext) {

    vscode.window.showInformationMessage(`CommandPilot Enabled`);

    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
        activeTextEditor.options = {
        tabSize: 100
        };
    }               

    const disposable = vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
        // Call your function here
        handleDocumentChange(e.document);
    });

    const provider: vscode.CompletionItemProvider = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        provideInlineCompletionItems: async (document, position, context, token) => {

            //Gets text ahead of cursor on that line
            const textBeforeCursor = document.getText(
                new vscode.Range(position.with(undefined, 0), position)
            );

            //Uses that as search query - Change it so if match, gets the next line?
            if(!matched) {
                match = matchSearchPhrase(textBeforeCursor);
                console.log('Matched:', match);
                solution = await search(match.searchPhrase);
            }
            
            if(match && !matched) {
                matched = true;
                solution = "\n" + solution;
            }
            //gets the entire commented string and breaks into components
            
            let items: (vscode.CompletionItem | undefined)[] = [];

            if (match && solution) {
                try {
                    if (solution) {
                        const suggestions = getSuggestions(solution);
                        items = suggestions.map((item: any) => {
                            if (item.trim() != "") {
                                const completionItem = new vscode.CompletionItem(item, 0);
                                completionItem.insertText = item.replace(/\t/g, '    ');
                                completionItem.range = new vscode.Range(position.translate(0, item.length), position);
                                completionItem.keepWhitespace = true;
                                console.log(completionItem);
                                return completionItem;  
                            }                                                                      
                        });
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
            }
            return {items};
        },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
}

function removeFirstLine(text: string): string {
    const newlineIndex = text.indexOf('\n');
    if (newlineIndex !== -1) { // Check if newline character exists
        return text.substring(newlineIndex + 1);
    }
    return text; // Return the original text if no newline character is found
}

function getSuggestions(text: string): string[] {
    let result = [text];
    const newlineIndex = text.indexOf('\n');
    if (newlineIndex !== -1) { // Check if newline character exists
        result = text.substring(0, newlineIndex + 1).split("\\o ");
        if(result.length > 1){
            const leadingWhitespace = result[0].match(/^\s*/)?.[0];
            result.forEach(item => {
                item.trim();
                result = result.map(item => leadingWhitespace + item.trim() + '\n');
            });
        }
    }
    return result; // Return the original text if no newline character is found
}

function handleDocumentChange(document: vscode.TextDocument) {
    if (solution)
        solution = removeFirstLine(solution);
    if(document.lineCount === 1)
        reset();
    console.log('Document Changed');
}

function reset() {
    matched = false;
    accepted = false;
    solution = null;
    match  = undefined;
}