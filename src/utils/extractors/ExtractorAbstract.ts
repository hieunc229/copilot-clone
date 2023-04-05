import { getConfig, getSearchURL } from "../../config";
import { FetchPageResult, fetchPageTextContent } from "../fetchPageContent";

export default abstract class ExtractorAbstract {
    abstract name: string;
    abstract URL: string;

    isEnabled(): boolean {
        const config = getConfig();
        return this.URL in config.settings.sites && config.settings.sites[this.URL];
    }

    /**
     * Return a list of Source URLs from Google Search's result
     */
    extractURLFromKeyword = async (keyword: string): Promise<string[]> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const rs = await fetchPageTextContent(getSearchURL(this.URL, keyword));
            const regex = new RegExp(`(https://${this.URL}/[a-z0-9-/]+)`, "gi");
            let urls = rs.textContent.match(regex);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            urls = urls?.filter((url, i, list) => list.indexOf(url) === i) || null;

            return urls || [];
        } catch (error) {
            throw error;
        }
    };

    /**
     * Extract code snippets from the provided FetchPageResult
     */
    abstract extractSnippets(options: FetchPageResult): SnippetResult[];
}

export type SnippetResult = {
    votes?: number;
    code?: string;
    hasCheckMark?: boolean;
    sourceURL?: string;
};

export type SnippetPageResult = {
    results: SnippetResult[];
    url: string;
};
