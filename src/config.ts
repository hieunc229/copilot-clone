import * as vscode from 'vscode';

const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};

export function getSearchURL(site: string, keyword: string) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}

type IConfig = {
    settings: {
        sites: { [name: string]: boolean },
        parsers : { [name: string]: boolean }
        enableParsers: boolean,
        huggingfaceToken: string,
        externalParsers: Array<string>,
        maxResults: number
    }
}

export function getConfig() {
    const config = vscode.workspace.getConfiguration("captainStack");

    const sites = {
        "stackoverflow.com": config.settings.sites.stackoverflow,
        "gist.github.com": config.settings.sites.githubGist
    };

    const parsers = config.settings.parsers;

    return {
        settings: {
            sites,
            parsers,
            enableParsers: config.settings.enableParsers,
            huggingfaceToken: config.settings.huggingfaceToken,
            externalParsers: config.settings.externalParserUrls[0].split(','),
            maxResults: config.settings.maxResults
        }
    } as IConfig;
}

export default CSConfig;