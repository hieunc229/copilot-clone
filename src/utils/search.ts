import * as vscode from 'vscode';

import bmi from './resources/BMI.txt';
import deviation from './resources/AverageStandardDeviation.txt';
import minmax from './resources/MinMax.txt';
import multiples from './resources/Multiples.txt';
import coin from './resources/TossCoin.txt';
import area from './resources/TriangleArea.txt';
import vert from './resources/Vertebrates.txt';

/**
 * Cache results to avoid VSCode keep refetching
 */
const cachedResults: { [keyword: string]: string } = {};

export async function search(keyword: string): Promise<null |  string > {


    if (keyword in cachedResults) {
        return Promise.resolve(cachedResults[keyword]);
    }

    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise<string>(async (resolve, reject) => {

        console.log('Searching:', keyword);
        let results = "";
        const solutions: { [key: string]: string } = { bmi, deviation, minmax, multiples, coin, area, vert };

        try {
            Object.keys(solutions).forEach(key => {
                if((keyword).includes(key)) {
                    results = solutions[key]; // Fix: Wrap the string in an array
                    return;
                }
            });
            resolve(results);
        } catch (error) {
            console.error('Error reading directory:', error);
            reject(error);
        }

        console.log(results[0]);

        // When promise resolved, show finished loading for 5 seconds
        vscode.window.showInformationMessage(`CommandPilot: Finished loading results`);
    });
    return promise;
}
