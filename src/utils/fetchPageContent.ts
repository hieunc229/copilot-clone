import fetch from "node-fetch";

export type FetchPageResult = {
    match(regex: RegExp): unknown;
    textContent: string,
    url: string
}

export function fetchPageTextContent(url: string): Promise<FetchPageResult> {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(rs => rs.text())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .then(textContent => resolve({textContent, url}))
            .catch(reject);
    });
}