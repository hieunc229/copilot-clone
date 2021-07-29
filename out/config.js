"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSConfig = {
    SEARCH_ENDPOINT: `https://www.google.com/search?q=site%3Astackoverflow.com+`,
    SEARCH_PATTERN: /[\/\/|#|\-\-|<!\-\-]\s?find\s?(.+)\./
};
exports.default = CSConfig;
