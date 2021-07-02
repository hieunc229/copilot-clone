"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSnippetResults = void 0;
const jsdom_1 = require("jsdom");
// Extract and sort stackoverflow answers
function extractSnippetResults(options) {
    var doc = new jsdom_1.JSDOM(options.textContent);
    let answersWithCodeBlock = Array.from(doc.window.document.querySelectorAll(".answer"))
        .filter((item) => item.querySelector("code") != null);
    let results = answersWithCodeBlock
        .map((item) => ({
        textContent: item.textContent,
        votes: parseInt(item.querySelector(".js-vote-count").textContent),
        // TODO: Handle answers with more than one code block
        // p/s: they often about explaining the something
        code: item.querySelector("code").textContent,
        sourceURL: item.querySelector(".js-share-link").href,
        hasCheckMark: item.querySelector("iconCheckmarkLg") != null
    }))
        .filter(item => isCodeValid(item.code));
    results.sort(sortSnippetResultFn);
    return { url: options.url, results };
}
exports.extractSnippetResults = extractSnippetResults;
function sortSnippetResultFn(a, b) {
    if (a.hasCheckMark != b.hasCheckMark) {
        return a.hasCheckMark ? 1 : -1;
    }
    let result = b.votes - a.votes;
    return result === 0 ? b.code.length - a.code.length : result;
}
// Check whether the input should be considered as code input or random text
function isCodeValid(input) {
    // This is just a temporary solution,
    // it would filter codes that are too short
    return input.length > 12;
}
