"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const vscode = require("vscode");
function getConfig() {
    const config = vscode.workspace.getConfiguration("captainShannon");
    return {
        settings: {
            modelName: config.settings.modelName,
            APIKey: config.settings.APIKey,
            n_samples: config.settings.n_samples,
        }
    };
}
exports.getConfig = getConfig;
/*

You can add more hyperparams in package.json


*/ 
