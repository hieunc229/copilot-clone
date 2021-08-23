"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const extractors_1 = require("./extractors");
const fetchPageContent_1 = require("./fetchPageContent");
const vscode = require("vscode");
const config_1 = require("../config");
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
    const config = config_1.getConfig();
    /* eslint "no-async-promise-executor": "off" */
    const promise = new Promise(async (resolve, reject) => {
        let results = [];
        let fetchResult;
        try {
            for (const i in extractors_1.default) {
                const extractor = extractors_1.default[i];
                if (extractor.isEnabled()) {
                    const urls = await extractor.extractURLFromKeyword(keyword);
                    for (const y in urls) {
                        fetchResult = await fetchPageContent_1.fetchPageTextContent(urls[y]);
                        results = results.concat(extractor.extractSnippets(fetchResult));
                        vscode.window.setStatusBarMessage(`${extractor.name} (${y}/${urls.length}): ${results.length} results`, 2000);
                        if (results.length >= config.settings.maxResults) {
                            break;
                        }
                    }
                    if (results.length >= config.settings.maxResults) {
                        break;
                    }
                }
            }
            cachedResults[keyword] = results;
            resolve({ results });
        }
        catch (err) {
            reject(err);
        }
        // When promise resolved, show finished loading for 5 seconds
        vscode.window.setStatusBarMessage(`CaptainStack: Finished loading ${results.length} results`);
    });
    vscode.window.setStatusBarMessage(`CaptainStack: Start loading snippet results...`, promise);
    return promise;
}
exports.search = search;
