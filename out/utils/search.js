"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const extractGoogleResults_1 = require("./extractGoogleResults");
const extractStackOverflowResults_1 = require("./extractStackOverflowResults");
const fetchPageContent_1 = require("./fetchPageContent");
// Send search query to google, get answers from stackoverflow
// then extract and return code results
async function search(keyword) {
    return new Promise((resolve, reject) => {
        extractGoogleResults_1.extractGoogleResults(keyword)
            .then(async (urls) => {
            if (urls === null) {
                return Promise.resolve(null);
            }
            let results = [];
            try {
                let fetchResult;
                for (const i in urls.splice(0, 6)) {
                    if (urls[i]) {
                        fetchResult = await fetchPageContent_1.fetchPageTextContent(urls[i]);
                        results = results.concat(extractStackOverflowResults_1.extractSnippetResults(fetchResult).results);
                    }
                }
                resolve({ results });
            }
            catch (err) {
                reject(err);
            }
        }).catch(reject);
    });
}
exports.search = search;
