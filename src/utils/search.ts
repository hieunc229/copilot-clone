import * as vscode from 'vscode';

import bmi from './resources/BMI.txt';
import { BADFAMILY } from 'dns';

/**
 * Cache results to avoid VSCode keep refetching
 */
const cachedResults: { [keyword: string]: string[] } = {};

export async function search(keyword: string): Promise<null | { results: string[] }> {


    if (keyword in cachedResults) {
        return Promise.resolve({results: cachedResults[keyword]});
    }

    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise<{ results: string[] }>(async (resolve, reject) => {

        console.log('Searching:', keyword);
        console.log('File Contents', bmi);
        const results: string[] = [];

        try {
            // const files = fs.readdirSync('resources');
            // files.forEach((file) => {
            //     console.log("File Name: ", file);
            //     if(file.toLowerCase().includes(keyword))
            //         results.push(fs.readFileSync(file, 'utf-8'));
        
            // });
            results.push(bmi);
            resolve({ results });
        } catch (error) {
            console.error('Error reading directory:', error);
            reject(error);
        }
        

        // When promise resolved, show finished loading for 5 seconds
        vscode.window.setStatusBarMessage(`CommandPilot: Finished loading ${results.length} results`);
    });

    vscode.window.setStatusBarMessage(`CommandPilot: Start loading snippet results...`, promise);
    return promise;
}
