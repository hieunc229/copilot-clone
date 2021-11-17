import internal = require('stream');
import * as vscode from 'vscode';
import { getConfig } from "./config";

/**
 * Cache results to prevent unnecessary sampling
 */
const cachedResults: { [prompt: string]: SnippetResult[] } = {};

export type SnippetResult = {
    code: string,
}

export async function sample(prompt: string): Promise<null | { results: SnippetResult[] }> {


    if (prompt in cachedResults) {
        return Promise.resolve({ results: cachedResults[prompt] });
    }

    // currently just has n_samples, a dummy API key, and a model name
    const config = getConfig();

    /* eslint "no-async-promise-executor": "off" */
    const promise = new Promise<{ results: SnippetResult[] }>(async (resolve, reject) => {

        let results: SnippetResult[] = [];

        try {
            // TODO: Ben write this please
            // results = sample_from_api_yah(prompt, config)

            // just using some dummy results for now
            vscode.window.showInformationMessage('Hello friend!!!');
            const my_var: SnippetResult = {code: `hello i am code` +Math.random()};
            const my_var2: SnippetResult = {code: `i, too, am the code` +Math.random()};
            results = [my_var, my_var2];

            cachedResults[prompt] = results;

            resolve({ results });
        } catch (err) {
            reject(err);
        }

    });



   return promise;


}
