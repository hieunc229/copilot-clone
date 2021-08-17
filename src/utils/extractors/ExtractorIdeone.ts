import { FetchPageResult } from "../fetchPageContent";
import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";
import { request } from "https";


export default class ExtractorIdeone extends ExtractorAbstract {
    URL = 'ideone.com'
    name = 'Ideone'

    extractSnippets = (options: FetchPageResult): SnippetResult[] => {
        const result: SnippetResult = {
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

function get_plainfile(url: string): string {
    const req = request(convert_url(url));
    req.on('error', (e: Error) => 
        console.error(`problem with request to ${convert_url(url)}: ${e.message}`)
    );
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