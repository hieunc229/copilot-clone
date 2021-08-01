"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const extractors_1 = require("./extractors");
const fetchPageContent_1 = require("./fetchPageContent");
const vscode = require("vscode");
/**
 * Cache results to avoid VSCode keep refetching
 */
let cachedResults = {};
// Send search query to google, get answers from stackoverflow
// then extract and return code results
async function search(keyword) {
    if (keyword in cachedResults) {
        return Promise.resolve({ results: cachedResults[keyword] });
    }
    /* eslint "no-async-promise-executor": "off" */
    return new Promise(async (resolve, reject) => {
        let results = [];
        let fetchResult;
        try {
            for (const i in extractors_1.default) {
                const extractor = extractors_1.default[i];
                const urls = await extractor.extractURLFromKeyword(keyword);
                for (const y in urls) {
                    // A promise for vscode to stop showing the status bar message when resolved with the FetchPageResult and then show message with attached promise
                    // so the message will be hidden again when promise has been resolved.
                    let promise = new Promise((resolve, reject) => {
                        resolve(fetchPageContent_1.fetchPageTextContent(urls[y]));
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
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.search = search;
