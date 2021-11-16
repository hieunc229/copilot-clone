import * as vscode from 'vscode';

const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};
// const CSConfig = {
//     SEARCH_PATTERN: /.*/
// };



type IConfig = {
    settings: {
        modelName: string,
        APIKey: string,
        maxResults: number
    }
}

export function getConfig() {
    const config = vscode.workspace.getConfiguration("captainShannon");

    return {
        settings: {
            modelName: config.settings.modelName,
            APIKey: config.settings.APIKey,
            maxResults: config.settings.maxResults
        }
    } as IConfig;
}

export default CSConfig;
