"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchURL = void 0;
const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};
function getSearchURL(site, keyword) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}
exports.getSearchURL = getSearchURL;
exports.default = CSConfig;
