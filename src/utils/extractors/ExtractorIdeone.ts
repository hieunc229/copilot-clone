import { FetchPageResult } from "../fetchPageContent";
import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";
import fetch from "node-fetch";

export default class ExtractorIdeone extends ExtractorAbstract {
    URL = 'ideone.com'
    name = 'Ideone'

    extractSnippets = (options: FetchPageResult): SnippetResult[] => {
        let r: SnippetResult;
        get_plaintext(convert_url(options.url)).then(
            (text) => {
                    const result: SnippetResult = {
                        /* TODO: Ideone has no equivalent of "votes", so
                        results will only display when only ideone.com is
                        chosen. */
                        votes: 0,
                        code: text,
                        sourceURL: options.url,
                        hasCheckMark: false
            }; r = result;});
        return [r];
    };
}

async function get_plaintext(url: string) {
    const f = await fetch(convert_url(url));
    if (!f.ok) {
        throw new Error(`HTTP error! status: ${f.status}`);
      }
    return await f.text();
}

/**
 * Convert a Ideone URL into an URL linking to a fetchable version
 * of code.
 * @param s source Ideone URL
 * @returns converted URL
 */
function convert_url(s: string) {
    /* NOTE: assumes URLs found through Google are in two forms:
    ideone.com/fork/<snippit id> or ideone.com/<snippid id>
    */
    if (s.includes('fork')) return s.replace('fork', 'plain');
    else {
        const last_slash = s.lastIndexOf('/');
        return s.slice(0, last_slash) + 'plain' + s.slice(last_slash);
    }
}