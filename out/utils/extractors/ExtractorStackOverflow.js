"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtractorAbstract_1 = require("./ExtractorAbstract");
const linkedom_1 = require("linkedom");
const utils_1 = require("./utils");
class ExtractorStackOverflow extends ExtractorAbstract_1.default {
    constructor() {
        super(...arguments);
        this.name = "Stackoverflow";
        this.URL = "stackoverflow.com";
        this.extractSnippets = (options) => {
            const target = linkedom_1.parseHTML(options.textContent);
            const answersWithCodeBlock = Array.from(target.window.document.querySelectorAll(".answer"))
                .filter((item) => item.querySelector("code") != null);
            const results = answersWithCodeBlock
                .map((item) => ({
                textContent: item.textContent,
                votes: parseInt(item.querySelector(".js-vote-count").textContent),
                // TODO: Handle answers with more than one code block
                // p/s: they often about explaining the something
                code: item.querySelector("code").textContent,
                sourceURL: `https://${this.URL}${item.querySelector(".js-share-link").href}`,
                hasCheckMark: item.querySelector("iconCheckmarkLg") != null
            }))
                .filter(item => utils_1.isCodeValid(item.code));
            results.sort(sortSnippetResultFn);
            return results;
        };
    }
}
exports.default = ExtractorStackOverflow;
function sortSnippetResultFn(a, b) {
    if (a.hasCheckMark != b.hasCheckMark) {
        return a.hasCheckMark ? 1 : -1;
    }
    const result = b.votes - a.votes;
    return result === 0 ? b.code.length - a.code.length : result;
}
