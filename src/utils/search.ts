import SnippetExtractors from "./extractors";
import { SnippetResult } from "./extractors/ExtractorAbstract";

import { FetchPageResult, fetchPageTextContent } from "./fetchPageContent";

/**
 * Cache results to avoid VSCode keep refetching
 */
const cachedResults: { [keyword: string]: SnippetResult[] } = {};

// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string): Promise<null | { results: SnippetResult[] }> {

    if (keyword in cachedResults) {
        return Promise.resolve({ results: cachedResults[keyword] });
    }
    

    /* eslint "no-async-promise-executor": "off" */
    let promise = new Promise<{ results: SnippetResult[] }>(async (resolve, reject) => {

        let results: SnippetResult[] = [];
        let fetchResult: FetchPageResult;
        
        try {
            for (const i in SnippetExtractors) {
                const extractor = SnippetExtractors[i];
                const urls = await extractor.extractURLFromKeyword(keyword);

                for (const y in urls) {
                    fetchResult = await fetchPageTextContent(urls[y]);
                    results = results.concat(extractor.extractSnippets(fetchResult));
                }
            }

            cachedResults[keyword] = results;

            resolve({ results });
        } catch (err) {
            reject(err);
        }

        // When promise resolved, show finished loading for 7 seconds
        vscode.window.setStatusBarMessage("Finished loading results", 7000);
    });
    
    vscode.window.setStatusBarMessage("Loading Captain Stack results...", promise);
    return promise;
}
