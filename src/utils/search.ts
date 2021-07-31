import { extractGoogleResults } from "./extractGoogleResults";
import { extractSnippetResults, SnippetResult } from "./extractStackOverflowResults";
import { fetchPageTextContent } from "./fetchPageContent";
import * as vscode from 'vscode';

// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string): Promise<null | { results: SnippetResult[] }> {

    return new Promise((resolve, reject) => {

        extractGoogleResults(keyword)
            .then(async urls => {
                if (urls === null) {
                    return Promise.resolve(null);
                }

                let results: SnippetResult[] = [];

                try {
                    let fetchResult: { textContent: string, url: string };

                    for (const i in urls.splice(0, 6)) {
                        if (urls[i]) {
                            // A promise for vscode to stop showing the status bar message when resolved with the FetchPageResult and then show message with attached promise
                            // so the message will be hidden again when promise has been resolved.
                            let promise = new Promise<{ textContent: string, url: string }>((resolve, reject) => {
                                resolve(fetchPageTextContent(urls[i]));
                            });
                            vscode.window.setStatusBarMessage("Loading Captain Stack results...", promise);
                            fetchResult = await promise;
                            // When promise resolved, show finished loading for 5 seconds
                            vscode.window.setStatusBarMessage("Finished loading results", 5000);
                            results = results.concat(extractSnippetResults(fetchResult).results);
                        }
                    }

                    for (const y in urls) {
                    }

                    resolve({ results });
                } catch (err) {
                    reject(err);
                }
            }).catch(reject);

    });
}
