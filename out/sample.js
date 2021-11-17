"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
/**
 * Cache results to prevent unnecessary sampling
 */
const cachedResults = {};
async function sample(prompt) {
    if (prompt in cachedResults) {
        return Promise.resolve({ results: cachedResults[prompt] });
    }
    // currently just has n_samples, a dummy API key, and a model name
    const config = (0, config_1.getConfig)();
    /* eslint "no-async-promise-executor": "off" */
    const promise = new Promise(async (resolve, reject) => {
        let results = [];
        try {
            // TODO: Ben write this please
            // results = sample_from_api_yah(prompt, config)
            // just using some dummy results for now
            vscode.window.showInformationMessage('Hello friend!!!');
            const my_var = { code: `hello i am code` + Math.random() };
            const my_var2 = { code: `i, too, am the code` + Math.random() };
            results = [my_var, my_var2];
            cachedResults[prompt] = results;
            resolve({ results });
        }
        catch (err) {
            reject(err);
        }
    });
    return promise;
}
exports.sample = sample;
