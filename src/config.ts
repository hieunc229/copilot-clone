import * as vscode from 'vscode';

const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
    //SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?(code|analizar|refactorizar|crear|comentar|buscar|find)\s?(.+)\s?(\.|-->)/i
};

export function getSearchURL(site: string, keyword: string) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}

type IConfig = {
    settings: {
        sites: { [name: string]: boolean },
        maxResults: number,
        openaiApiKey: string
    }
}

export function getConfig() {
    const config = vscode.workspace.getConfiguration("captainStack");

    const sites = {
        "stackoverflow.com": config.settings.sites.stackoverflow,
        "gist.github.com": config.settings.sites.githubGist
    };
    const openaiApiKey = config.settings.openai.apiKey;


    return {
        settings: {
            sites,
            maxResults: config.settings.maxResults,
            openaiApiKey
        }
    } as IConfig;
}

export default CSConfig;
