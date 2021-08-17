import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";

import { parseHTML } from "linkedom";
import { FetchPageResult } from "../fetchPageContent";
import { Document } from "linkedom/types/interface/document";

export default class ExtractorGithubGist extends ExtractorAbstract {

    name = "Github Gist"
    URL = "gist.github.com"

    extractSnippets = (options: FetchPageResult): SnippetResult[] => {
        const target = parseHTML(options.textContent);
        const doc: Document = target.window.document;

        const snippet: string = doc.querySelector("table.highlight").parentNode.textContent;

        if (!snippet) return [];

        const item: SnippetResult = {
            votes: parseInt(doc.querySelector(".social-count").parentNode.textContent),
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
 * @returns string stripped of unnecessary whitespace
 */
function cleanContent(input: string): string {
    return input.replace(/\n {6}\n {8}\n {8}/g, "");
}