"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const extractors_1 = require("./extractors");
const fetchPageContent_1 = require("./fetchPageContent");
const vscode = require("vscode");
/**
 * Cache results to avoid VSCode keep refetching
 */
const cachedResults = {};
// Send search query to google, get answers from stackoverflow
// then extract and return code results
async function search(keyword) {
    if (keyword in cachedResults) {
        return Promise.resolve({ results: cachedResults[keyword] });
    }
    /* eslint "no-async-promise-executor": "off" */
    const promise = new Promise(async (resolve, reject) => {
        let results = [];
        let fetchResult;
        try {
            for (const i in extractors_1.default) {
                const extractor = extractors_1.default[i];
                const urls = await extractor.extractURLFromKeyword(keyword);
                for (const y in urls) {
                    fetchResult = await fetchPageContent_1.fetchPageTextContent(urls[y]);
                    results = results.concat(extractor.extractSnippets(fetchResult));
                }
            }
            cachedResults[keyword] = results;
            resolve({ results });
        }
        catch (err) {
            reject(err);
        }
        // When promise resolved, show finished loading for 7 seconds
        vscode.window.setStatusBarMessage("Finished loading results", 7000);
    });
    vscode.window.setStatusBarMessage("Loading Captain Stack results...", promise);
    return promise;
}
exports.search = search;
