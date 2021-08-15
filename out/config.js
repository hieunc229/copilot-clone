"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.getSearchURL = void 0;
const vscode = require("vscode");
const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};
function getSearchURL(site, keyword) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}
exports.getSearchURL = getSearchURL;
function getConfig() {
    const config = vscode.workspace.getConfiguration("captainStack");
    return {
        settings: config.settings,
    };
}
exports.getConfig = getConfig;
exports.default = CSConfig;
