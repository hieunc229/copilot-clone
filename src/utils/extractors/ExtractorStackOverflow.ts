import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";

import { parseHTML } from "linkedom";
import { isCodeValid } from "./utils";
import { FetchPageResult } from "../fetchPageContent";

export default class ExtractorStackOverflow extends ExtractorAbstract {

    name = "Stackoverflow";
    URL = "stackoverflow.com";

    extractSnippets = (options: FetchPageResult): SnippetResult[] => {
        const target = parseHTML(options.textContent);

        const answersWithCodeBlock = Array.from(target.window.document.querySelectorAll(".answer"))
            .filter((item: any) => item.querySelector("code") != null);

        const results = answersWithCodeBlock
            .map((item: any) => ({
                textContent: item.textContent,
                votes: parseInt(item.querySelector(".js-vote-count").textContent),

                // TODO: Handle answers with more than one code block
                // p/s: they often about explaining the something
                code: item.querySelector("code").textContent,
                sourceURL: `https://${this.URL}${item.querySelector(".js-share-link").href}`,
                hasCheckMark: item.querySelector("iconCheckmarkLg") != null
            }) as SnippetResult)
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .filter(item => isCodeValid(item?.code));


        results.sort(sortSnippetResultFn);

        return results;
    };
}

function sortSnippetResultFn(a: SnippetResult, b: SnippetResult) {

    if (a.hasCheckMark != b.hasCheckMark) {
        return a.hasCheckMark ? 1 : -1;
    }
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const result = b?.votes - a?.votes;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return result === 0 ? b?.code.length - a?.code.length : result;
}
