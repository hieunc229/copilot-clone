import SnippetExtractors from "./extractors";
import { SnippetResult } from "./extractors/ExtractorAbstract";

import { FetchPageResult, fetchPageTextContent } from "./fetchPageContent";

import * as vscode from 'vscode';

/**
 * Cache results to avoid VSCode keep refetching
 */
let cachedResults: { [keyword: string]: SnippetResult[] } = {}

// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string): Promise<null | { results: SnippetResult[] }> {

    if (keyword in cachedResults) {
        return Promise.resolve({ results: cachedResults[keyword] })
    }

    /* eslint "no-async-promise-executor": "off" */
    return new Promise(async (resolve, reject) => {

        let results: SnippetResult[] = [];
        let fetchResult: FetchPageResult;

        try {
            for (const i in SnippetExtractors) {
                const extractor = SnippetExtractors[i];
                const urls = await extractor.extractURLFromKeyword(keyword);

                for (const y in urls) {
                    // A promise for vscode to stop showing the status bar message when resolved with the FetchPageResult and then show message with attached promise
                    // so the message will be hidden again when promise has been resolved.
                    let promise = new Promise<{ textContent: string, url: string }>((resolve, reject) => {
                        resolve(fetchPageTextContent(urls[y]));
                    });
                    vscode.window.setStatusBarMessage("Loading Captain Stack results...", promise);
                    fetchResult = await promise;
                    // When promise resolved, show finished loading for 5 seconds
                    vscode.window.setStatusBarMessage("Finished loading results", 5000);
                    results = results.concat(extractor.extractSnippets(fetchResult));
                }
            }

            cachedResults[keyword] = results;

            resolve({ results });
        } catch (err) {
            reject(err);
        }
    });
}
