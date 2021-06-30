import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const GURL = `https://www.google.com/search?q=site%3Astackoverflow.com+`;

type SnippetResult = {
    results: { votes: number, code:string, textContent: string }[],
    url: string
}

// Get search results from google, then return a list of stackoverflow links
function getGoogleResults(keyword: string): Promise<string[] | null> {
    return new Promise((resolve, reject) => {
        return fetch(`${GURL}${keyword.replace(/\s/, '+')}`)
            .then(rs => rs.text())
            .then(rs => resolve(
                rs.match(/(https:\/\/stackoverflow.com\/[a-z0-9-/]+)/g))
            )
            .catch(reject)
    })

}

async function getStackoverflowContent(url: string): Promise<{ content: string, url: string }> {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(rs => rs.text())
            .then(rs => resolve({ content: rs, url }))
            .catch(reject)
    })
}

// Extract and sort stackoverflow answers
function getSnippetResults(options: { content: string, url: string }): SnippetResult {
    var doc = new JSDOM(options.content)

    let els = Array.from(doc.window.document.querySelectorAll(".answer"))
        .filter((item: any) => item.querySelector("code") != null)

    let results = els.map((item: any) => ({
        textContent: item.textContent,
        votes: parseInt(item.querySelector(".js-vote-count").textContent),
        code: item.querySelector("code").textContent
    }))

    // Sort results by code length
    results.sort((a,b) => b.code.length - a.code.length)

    return { url: options.url, results }
}

// Send search query to google, get answers from stackoverflow
// then extract and return code results
export async function search(keyword: string) {
    const urls = await getGoogleResults(keyword)

    if (urls === null) {
        return null
    }

    // Iterate through all urls if you want
    // I also use the first results to avoid having too many requests
    const snippets = await getStackoverflowContent(urls[0]);
    return getSnippetResults(snippets)
}