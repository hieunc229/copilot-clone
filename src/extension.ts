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
    const config = vscode.workspace.getConfiguration('editor');
    config.update('autoIndent', 'none', vscode.ConfigurationTarget.Workspace);

    const disposable = vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
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
                    if (solution && document.lineAt(position.line).text.trim() === '') {
                        const suggestions = getSuggestions(solution.split('\n')[position.line]);
                        items = suggestions.map((item: any) => {
                            if (item.trim() != "") {
                                const completionItem = new vscode.CompletionItem(item, 0);
                                completionItem.insertText = item.replace(/\t/g, '    ') + (document.lineCount === position.line + 1 ? '\n' : '');
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

    vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.contentChanges.length > 0) {
            const change = e.contentChanges[0];
            if (change.text === '' && change.rangeLength === 1) {
                const line = change.range.start.line;
                //if (line !== 0) {
                    const lineMaxColumn = e.document.lineAt(line).range.end.character;
                    const wholeLineRange = new vscode.Range(line, 0, line, lineMaxColumn);
                    const edit = new vscode.WorkspaceEdit();
                    edit.delete(e.document.uri, wholeLineRange);
                    vscode.workspace.applyEdit(edit);
                //}
            }
        }
    });
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
    if(text.includes("\\o")){
        result = text.split("\\o ");
        const leadingWhitespace = result[0].match(/^\s*/)?.[0];
        result = result.map(item => (leadingWhitespace + item.trim() + " //option line"));
    }
    return result; // Return the original text if no newline character is found
}


function handleDocumentChange(document: vscode.TextDocument) {
    const editor = vscode.window.activeTextEditor;
    if(editor) {
        const line = editor.document.lineAt(editor.selection.active.line);
        if(editor.selection.active.line === 0 && matched && line.text === '') {
            reset();
        }
    }
    console.log('Document Changed');
}

function reset() {
    matched = false;
    accepted = false;
    solution = null;
    match  = undefined;
    clearEditor();
}

function clearEditor() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        editor.edit(editBuilder => {
            editBuilder.delete(new vscode.Range(
                new vscode.Position(0, 0),
                new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length)
            ));
        });
    }
}