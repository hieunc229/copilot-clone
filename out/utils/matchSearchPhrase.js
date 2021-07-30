"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchSearchPhrase = void 0;
const config_1 = require("../config");
/**
 * Match the giving string with search pattern
 * @param {string} input
 * @returns {SearchMatchResult | undefined} if found, return the search phrase, comment's opening and closing syntax
 */
function matchSearchPhrase(input) {
    const match = config_1.default.SEARCH_PATTERN.exec(input);
    if (match && match.length > 2) {
        const [_, commentSyntax, searchPhrase, commentSyntaxEnd] = match;
        return {
            commentSyntax,
            commentSyntaxEnd,
            searchPhrase,
        };
    }
    return undefined;
}
exports.matchSearchPhrase = matchSearchPhrase;
