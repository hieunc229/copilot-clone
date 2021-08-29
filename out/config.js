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
    let sites = {
        "stackoverflow.com": config.settings.sites.stackoverflow,
        "gist.github.com": config.settings.sites.githubGist
    };
    return {
        settings: {
            sites,
            maxResults: config.settings.maxResults
        },
    };
}
exports.getConfig = getConfig;
exports.default = CSConfig;
