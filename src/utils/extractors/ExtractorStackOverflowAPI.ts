import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";
import { FetchPageResult } from "../fetchPageContent";
import { isCodeValid } from "./utils";
import fetch from "node-fetch";
import { getConfig } from "../../config";

export default class ExtractorStackOverflow extends ExtractorAbstract {
  name = "Stackoverflow";
  URL = "stackoverflow.com";

   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
  extractSnippets = async (
    options: FetchPageResult
  ): Promise<SnippetResult[]> => {
    const searchQuery = options.url.split("q=")[1];
    const config = getConfig();
    const apiKey = config.settings.stackoverflow;
    const apiUrl = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=${searchQuery}&site=stackoverflow&filter=withbody`;
    console.log('api key starto', apiKey);
    console.log('query: ', searchQuery);
    const response = await fetch(apiUrl, {
      headers: { "X-API-Key": apiKey },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Stack Overflow API");
    }

    const data = await response.json();
    const items = data.items;
    console.log('Items: ', items);

    const results = items
      .filter((item: { is_answered: any }) => item.is_answered)
      .map((item: { body: { match: (arg0: RegExp) => string[]; }; score: any; link: any; is_accepted: any; }) => {
        const code = item.body
          .match(/<pre><code>[\s\S]*?<\/code><\/pre>/gi)
          .map((code: string) =>
            code.replace(/<\/?[^>]+(>|$)/g, "").replace(/&lt;/g, "<")
          )[0];

        return {
          votes: item.score,
          code,
          sourceURL: item.link,
          hasCheckMark: item.is_accepted,
        };
      })
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
      .filter((item: SnippetResult) => isCodeValid(item.code))
      .sort(sortSnippetResultFn);

    return results;
  };
}

function sortSnippetResultFn(a: SnippetResult, b: SnippetResult) {
  if (a.hasCheckMark !== b.hasCheckMark) {
    return a.hasCheckMark ? -1 : 1;
  }

  if (a.votes !== b.votes) {
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
    return b.votes - a.votes;
  }
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
  return b.code.length - a.code.length;
}
