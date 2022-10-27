import * as vscode from 'vscode';

import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';
import { getConfig } from './config';
import Parsers from './utils/parsers/index';
import ParserAbstract from './utils/parsers/ParserAbstract';
import *  as fs from 'fs';
import *  as path from 'path';
import * as os from 'os';
import fetch from 'node-fetch';

const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'captainstack-'));
let externalParsers: Promise<ParserAbstract>[] = getConfig().settings.externalParsers.filter((e) => e !== '').map(async (e) => {
    const contents = await fetch(e).then((res) => res.text());
    const name = e.split('.')[e.split('.').length - 2];
    const filePath = path.join(tempDirectory, name) + '.ts';

    fs.writeFileSync(filePath, contents);
    return await import(filePath);
});
if (externalParsers.length !== 0) vscode.window.showInformationMessage('CaptainStack: Loaded ' + externalParsers.length + ' external parsers.');

interface ExtendedStatusBarItem extends vscode.StatusBarItem {
    idle?: () => void,
    working?: (tooltip: string) => void
}

export function activate(_: vscode.ExtensionContext) {
    const statusBar: ExtendedStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    statusBar.idle = (() => {
        statusBar.text = 'Captain Stack $(gear)';
        statusBar.tooltip = 'Idle';
    });
    statusBar.working = ((tooltip: string = 'Working...') => {
        statusBar.text = 'Captain Stack $(gear~spin)';
        statusBar.tooltip = tooltip;
    })

    statusBar.color = "pink";
    statusBar.show();
    if(statusBar.idle) statusBar.idle();


    const provider: vscode.CompletionItemProvider = {
        // @ts-ignore
        provideInlineCompletionItems: async (document: vscode.TextDocument, position, context, token) => {

            const textBeforeCursor = document.getText(
                new vscode.Range(position.with(undefined, 0), position)
            );

            const match = matchSearchPhrase(textBeforeCursor);
            let items: any[] = [];

            if (match) {
                if (statusBar.working) statusBar.working('Fetching snippets...');
                let rs;
                try {
                    rs = await search(match.searchPhrase);
                    if (rs) {
                        items = rs.results.map(item => {
                            const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
                            return {
                                text: output,
                                insertText: output,
                                range: new vscode.Range(position.translate(0, output.length), position)
                            };
                        });
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
            } else {
                /* check if parsers are enabled */
                if (getConfig().settings.enableParsers) {
                    if (statusBar.working) statusBar.working('Generating autocompletion...');

                    await new Promise((resolve, reject) => {
                        setInterval(() => {
                            if (externalParsers.filter(e => typeof e !== 'string').length === externalParsers.length) resolve(null);
                        }, 100);
                    });

                    /* result has to be determined using parsers. */
                    const parserText = document.getText(
                        new vscode.Range(position.with(0, 0), position)
                    );

                    const allExternalParsers = (await Promise.all(externalParsers));

                    /* find enabled parsers and ask them for a result! */
                    [...Parsers, ...allExternalParsers].filter((parser) => parser.isEnabled())
                        .forEach(async (parser) => {

                            parser.provideInlineCodeCompletions(
                                parserText,
                                document.fileName,
                                getConfig().settings.huggingfaceToken
                            ).then((result) => {
                                items.push({
                                    text: result,
                                    insertText: result,
                                    range: new vscode.Range(position.translate(0, result.length), position)
                                });
                            });
                        });

                    await new Promise((resolve, reject) => {
                        const beforeResolve = (() => {
                            resolve(null);
                        })

                        let iterations = 0;
                        setInterval(() => {
                            iterations++;
                            if (items.length === Parsers.length) beforeResolve();
                            else if (iterations > (5 * 10)) beforeResolve();
                            else {
                                if (statusBar.working) statusBar.working('Generating autocompletions... [' + items.length + '/' + Parsers.length + ']');
                            }
                        }, 100);
                    });
                }
            }

            if (statusBar.idle) statusBar.idle();
            return { items };
        },
    };

    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
