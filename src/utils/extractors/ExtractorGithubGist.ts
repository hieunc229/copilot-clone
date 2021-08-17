import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";

import { parseHTML } from "linkedom";
import { FetchPageResult } from "../fetchPageContent";

export default class ExtractorGithubGist extends ExtractorAbstract {

    name = "Github Gist"
    URL = "gist.github.com"

    extractSnippets = (options: FetchPageResult): SnippetResult[] => {
        const target = parseHTML(options.textContent);
        const doc = target.window.document;

        const snippet = doc.querySelector("table.highlight")?.textContent;

        if (!snippet) return [];

        const item: SnippetResult = {
            votes: parseInt(doc.querySelector(".social-count")?.textContent),
            code: cleanContent(snippet),
            sourceURL: options.url,
            hasCheckMark: false
        };

        return [item];
    }
}

/**
 * Github Gist use table to display code, which produces a bunch of unnecessary characters.
 * This feature is used to them clean up
 * @param input 
 * @returns 
 */
function cleanContent(input: string) {
    return input.replace(/\n {6}\n {8}\n {8}/g, "");
}