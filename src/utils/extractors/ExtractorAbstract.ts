import { getConfig, getSearchURL } from "../../config";
import { FetchPageResult, fetchPageTextContent } from "../fetchPageContent";

export default abstract class ExtractorAbstract {
  abstract name: string;
  abstract URL: string;
  generateCode?: (keyword: string, settings: any) => Promise<string[]>;
  // Extract snippets from URL content
  extractSnippets?: (options: FetchPageResult) => SnippetResult[];

  isEnabled() {
    const config = getConfig();
    return this.URL in config.settings.sites && config.settings.sites[this.URL];
  }

  /**
   * Return a list of Source URLs from Google Search's result
   */
  extractURLFromKeyword = (keyword: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      fetchPageTextContent(getSearchURL(this.URL, keyword))
        .then((rs) => {
          const regex = new RegExp(`(https://${this.URL}/[a-z0-9-/]+)`, "gi");
          const urls = (rs.textContent.match(regex) || []).filter(
            (url, i, list) => list.indexOf(url) === i
          );
          resolve(urls);
        })
        .catch(reject);
    });
  };
}

export type SnippetResult = {
  votes: number;
  code: string;
  hasCheckMark: boolean;
  sourceURL: string;
};

export type SnippetPageResult = {
  results: SnippetResult[];
  url: string;
};
