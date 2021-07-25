import CSConfig from "../config";
import { fetchPageTextContent } from "./fetchPageContent";

// Get search results from google, then return a list of stackoverflow links
export function extractGoogleResults(keyword: string): Promise<string[] | null> {
    return new Promise((resolve, reject) => {
        return fetchPageTextContent(`${CSConfig.SEARCH_ENDPOINT}${keyword.replace(/\s/, '+')}`)
            .then(rs => {
                let urls = rs.textContent.match(/(https:\/\/stackoverflow.com\/[a-z0-9-/]+)/g);
                urls && (urls = urls.filter((url, i, list) => list.indexOf(url) === i));
                resolve(urls);
            })
            .catch(reject);
    });

}