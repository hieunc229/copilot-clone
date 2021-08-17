"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtractorGithubGist_1 = require("./ExtractorGithubGist");
const ExtractorStackOverflow_1 = require("./ExtractorStackOverflow");
const ExtractorIdeone_1 = require("./ExtractorIdeone");
const SnippetExtractors = [
    new ExtractorStackOverflow_1.default(),
    new ExtractorGithubGist_1.default(),
    new ExtractorIdeone_1.default()
];
exports.default = SnippetExtractors;
