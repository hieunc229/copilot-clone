import * as vscode from "vscode";

const CSConfig = {
  SEARCH_PATTERN:
    /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)|(def|class|\.\.\.)\s?(.+)\s?(\:|-->)/,
};

export function getSearchURL(site: string, keyword: string) {
  return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(
    /\s/g,
    "+"
  )}`;
}

type IConfig = {
  settings: {
    sites: { [name: string]: boolean };
    maxResults: number;
    port: number;
    maxTokens: number;
  };
};

export function getConfig() {
  const config = vscode.workspace.getConfiguration("maverick");

  const sites = {
    "stackoverflow.com": config.settings.sites.stackoverflow,
    "gist.github.com": config.settings.sites.githubGist,
  };

  return {
    settings: {
      sites,
      maxResults: config.settings.maxResults,
      port: config.settings.port,
      maxTokens: config.settings.maxTokens,
    },
  } as IConfig;
}

export default CSConfig;
