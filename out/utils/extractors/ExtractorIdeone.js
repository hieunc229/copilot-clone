"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtractorAbstract_1 = require("./ExtractorAbstract");
const https_1 = require("https");
class ExtractorIdeone extends ExtractorAbstract_1.default {
    constructor() {
        super(...arguments);
        this.URL = 'ideone.com';
        this.name = 'Ideone';
        this.extractSnippets = (options) => {
            const result = {
                /* TODO: Ideone has no equivalent of "votes", so
                results will only display when only ideone.com is
                chosen. */
                votes: 0,
                code: get_plainfile(options.url),
                sourceURL: options.url,
                hasCheckMark: false
            };
            return [result];
        };
    }
}
exports.default = ExtractorIdeone;
function get_plainfile(url) {
    const req = https_1.request(convert_url(url));
    req.on('error', (e) => console.error(`problem with request to ${convert_url(url)}: ${e.message}`));
    req.on('uncaughtException', e => console.log(e));
    const file = '';
    req.write(file);
    req.end();
    return file;
}
/**
 * Convert a Ideone URL into an URL linking to a fetchable version
 * of code.
 * @param s source Ideone URL
 * @returns converted URL
 */
function convert_url(s) {
    /* NOTE: assumes URLs found through Google are in two forms:
    ideone.com/fork/<snippit id> or ideone.com/<snippid id>
    */
    if (s.includes('fork'))
        return s.replace('fork', 'plain');
    else {
        const last_slash = s.lastIndexOf('/');
        return s.slice(0, last_slash) + 'plain' + s.slice(last_slash);
    }
}
