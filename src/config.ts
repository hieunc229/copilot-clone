import * as vscode from "vscode";

export const CSConfig = {
  SEARCH_PATTERN:
    /(\/\/|#|--|\/\*|<!--)\s?(find|generate|gen)\s?(.+)\s?(\.|-->|\*\/)/,
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
    OpenAI?: { apiKey: string; model: string; systemPrompt?: string };
    OpenRouter?: { apiKey: string; model: string };
    ai?: {
      temperature?: number;
      systemPrompt?: string;
    };
  };
};

export function getConfig() {
  const config = vscode.workspace.getConfiguration("captainStack");

  const sites = {
    "stackoverflow.com": config.settings.sites.stackoverflow,
    "gist.github.com": config.settings.sites.githubGist,
    "openai.com": config.settings.sites.OpenAI,
    "openrouter.ai": config.settings.sites.OpenRouter,
  };

  return {
    settings: {
      sites,
      maxResults: config.settings.maxResults,
      OpenAI: config.settings.OpenAI,
      OpenRouter: config.settings.OpenRouter,
      ai: config.settings.ai,
    },
  } as IConfig;
}

export default CSConfig;
