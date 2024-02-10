import * as vscode from 'vscode';

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

let matched = false;
let accepted = false;
let solution: string| null;
let original: string;
let match: any = undefined;
let chosenOptions: string[] = [];

export function activate(_: vscode.ExtensionContext) {

    vscode.window.showInformationMessage(`CommandPilot Enabled`);

    vscode.commands.registerCommand('extension.onCompletionItemSelected', (item: vscode.CompletionItem) => {
        chosenOptions.push(item.label.replace("//option line", "").trim());
    });

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
                //console.log('Matched:', match);
                solution = await search(match.searchPhrase);
                original = solution ?? '';
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
                                //console.log(completionItem);
                                if (suggestions.length > 1) {
                                    completionItem.command = { command: 'extension.onCompletionItemSelected', title: '', arguments: [completionItem] };
                                }
                                //console.log(chosenOptions);
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
                const lineMaxColumn = e.document.lineAt(line).range.end.character;
                const wholeLineRange = new vscode.Range(line, 0, line, lineMaxColumn);
                const deletedLineText = e.document.lineAt(line).text.trim();
                const edit = new vscode.WorkspaceEdit();
                edit.delete(e.document.uri, wholeLineRange);
                console.log("Deleted; ", deletedLineText);
                const index = chosenOptions.indexOf(deletedLineText.replace("//option lin", "").trim());
                if (index !== -1) {
                    chosenOptions.splice(index, 1);
                }
                vscode.workspace.applyEdit(edit);
            }
        }
    });

    vscode.commands.registerCommand('extension.CheckSolution', () => {
        if(solution){
            const sortedChosenOptions = [...chosenOptions].sort();
            const sortedCorrectSolution = getCorrectSolution(solution).sort();
            console.log("Chosen: ", sortedChosenOptions);
            console.log("Solution:", sortedCorrectSolution);
            if (JSON.stringify(sortedChosenOptions) === JSON.stringify(sortedCorrectSolution)) {
                vscode.window.showInformationMessage('You chose the correct combination of options!');
            } else {
                vscode.window.showInformationMessage('You did not choose the correct combination of options.');
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
        result = result.map(item => (leadingWhitespace + item.replace("<<correct>>", "").trim() + " //option line"));
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
    //console.log('Document Changed');
}

function reset() {
    matched = false;
    accepted = false;
    solution = null;
    match  = undefined;
    original = "";
    chosenOptions = [];
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

function getCorrectSolution(solution: string) {
    const correctSolution: string[] = [];
    const lines = original.split('\n');
    lines.forEach((line: string) => {
        const options = line.split('\\o');
        options.forEach(option => {
            if (option.includes('<<correct>>')) {
            correctSolution.push(option.replace('<<correct>>', '').trim());
            }
        });
    });
    return correctSolution;
}