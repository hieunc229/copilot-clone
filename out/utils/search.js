"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const extractGoogleResults_1 = require("./extractGoogleResults");
const extractStackOverflowResults_1 = require("./extractStackOverflowResults");
const fetchPageContent_1 = require("./fetchPageContent");
// Send search query to google, get answers from stackoverflow
// then extract and return code results
function search(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            extractGoogleResults_1.extractGoogleResults(keyword)
                .then((urls) => __awaiter(this, void 0, void 0, function* () {
                if (urls === null) {
                    return Promise.resolve(null);
                }
                let results = [];
                try {
                    let fetchResult;
                    for (const i in urls.splice(0, 6)) {
                        if (urls[i]) {
                            fetchResult = yield fetchPageContent_1.fetchPageTextContent(urls[i]);
                            results = results.concat(extractStackOverflowResults_1.extractSnippetResults(fetchResult).results);
                        }
                    }
                    resolve({ results });
                }
                catch (err) {
                    reject(err);
                }
            })).catch(reject);
        });
    });
}
exports.search = search;
