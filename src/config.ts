import * as vscode from 'vscode';

type IConfig = {
    settings: {
        modelName: string,
        APIKey: string,
        n_samples: number
    }
}

export function getConfig() {
    const config = vscode.workspace.getConfiguration("captainShannon");

    return {
        settings: {
            modelName: config.settings.modelName,
            APIKey: config.settings.APIKey,
            n_samples: config.settings.n_samples,
        }
    } as IConfig;
}

/*

You can add more hyperparams in package.json


*/