import { parseHTML } from "linkedom";
import { FetchPageResult } from "./fetchPageContent";

export type SnippetResult = {
    votes: number,
    code: string,
    hasCheckMark: boolean,
    sourceURL: string,
    // textContent: string 
}

export type SnippetPageResult = {
    results: SnippetResult[],
    url: string
}

// Extract and sort stackoverflow answers
export function extractSnippetResults(options: FetchPageResult): SnippetPageResult {
    const doc = parseHTML(options.textContent);

    const answersWithCodeBlock = Array.from(doc.window.document.querySelectorAll(".answer"))
        .filter((item: any) => item.querySelector("code") != null);

    const results = answersWithCodeBlock
        .map((item: any) => ({
            textContent: item.textContent,
            votes: parseInt(item.querySelector(".js-vote-count").textContent),

            // TODO: Handle answers with more than one code block
            // p/s: they often about explaining the something
            code: item.querySelector("code").textContent,
            sourceURL: item.querySelector(".js-share-link").href,
            hasCheckMark: item.querySelector("iconCheckmarkLg") != null
        }) as SnippetResult)
        .filter(item => isCodeValid(item.code));


    results.sort(sortSnippetResultFn);

    return { url: options.url, results };
}

function sortSnippetResultFn(a: SnippetResult, b: SnippetResult) {

    if (a.hasCheckMark != b.hasCheckMark) {
        return a.hasCheckMark ? 1 : -1;
    }

    const result = b.votes - a.votes;
    return result === 0 ? b.code.length - a.code.length : result;
}

// Check whether the input should be considered as code input or random text
function isCodeValid(input: string) {

    // This is just a temporary solution,
    // it would filter codes that are too short
    return input.length > 12;
}