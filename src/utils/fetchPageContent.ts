import fetch from "node-fetch";

export type FetchPageResult = {
    textContent: string,
    url: string
}

export function fetchPageTextContent(url: string): Promise<FetchPageResult> {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(rs => rs.text())
            .then(textContent => resolve({textContent, url}))
            .catch(reject);
    });
}