import * as vscode from 'vscode';

const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?solve\s?(.+)\s?(\.|-->)/
};

type IConfig = {
    settings: {
        sites: { [name: string]: boolean },
        maxResults: number
    }
}

export function getConfig() {
    const config = vscode.workspace.getConfiguration("CommandPilot");

    return {
        settings: {
            maxResults: config.settings.maxResults
        }
    } as IConfig;
}

export default CSConfig;