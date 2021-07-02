"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGoogleResults = void 0;
const config_1 = require("../config");
const fetchPageContent_1 = require("./fetchPageContent");
// Get search results from google, then return a list of stackoverflow links
function extractGoogleResults(keyword) {
    return new Promise((resolve, reject) => {
        return fetchPageContent_1.fetchPageTextContent(`${config_1.default.SEARCH_ENDPOINT}${keyword.replace(/\s/, '+')}`)
            .then(rs => {
            let urls = rs.textContent.match(/(https:\/\/stackoverflow.com\/[a-z0-9-/]+)/g);
            urls && (urls = urls.filter((url, i, list) => list.indexOf(url) === i));
            resolve(urls);
        })
            .catch(reject);
    });
}
exports.extractGoogleResults = extractGoogleResults;
