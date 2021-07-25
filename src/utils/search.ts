import { extractGoogleResults } from "./extractGoogleResults";
import { extractSnippetResults, SnippetResult } from "./extractStackOverflowResults";
import { fetchPageTextContent } from "./fetchPageContent";

// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string): Promise<null | { results: SnippetResult[] }> {

    return new Promise((resolve, reject) => {

        extractGoogleResults(keyword)
            .then(async urls => {
                if (urls === null) {
                    return Promise.resolve(null);
                }

                let results: SnippetResult[] = [];

                try {
                    let fetchResult: { textContent: string, url: string };

                    for (const i in urls.splice(0, 6)) {
                        if (urls[i]) {
                            fetchResult = await fetchPageTextContent(urls[i]);
                            results = results.concat(extractSnippetResults(fetchResult).results);
                        }
                    }

                    resolve({ results });
                } catch (err) {
                    reject(err);
                }
            }).catch(reject);

    });
}
