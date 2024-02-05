import * as vscode from 'vscode';

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

let matched = false;
const accepted = false;
let solution: { results: string[]; } | null;
let match: any = undefined;

export function activate(_: vscode.ExtensionContext) {

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
            
            if(match)
                matched = true;
            //gets the entire commented string and breaks into components
            
            let items: any[] = [];

            if (match && solution) {
                try {
                    if(solution){
                        const suggestions = solution.results.map((item: string) => getFirstLine(item));
                        items = suggestions.map((item: any) => {
                            if(item != ""){
                                const output = `\n${item}`;
                                return {
                                    text: output,
                                    insertText: output,
                                    range: new vscode.Range(position.translate(0, output.length), position)
                                };
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

function getFirstLine(text: string): string {
    let result = text;
    const newlineIndex = text.indexOf('\n');
    if (newlineIndex !== -1) { // Check if newline character exists
        result =  text.substring(0, newlineIndex + 1);
    }
    return result; // Return the original text if no newline character is found
}

function handleDocumentChange(document: vscode.TextDocument) {
    if (solution) {
        solution.results = solution.results.map((item: string) => removeFirstLine(item));
    }
    console.log('Document Changed');
}