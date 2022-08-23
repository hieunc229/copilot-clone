import ParserAbstract from './ParserAbstract';
import * as lang from './languages';
import fetch from 'node-fetch';
import * as vscode from 'vscode';

let sentThisSession = false;
let apiLock = false;

/**
 * Sends an HTTP request to the huggingface bloom API and returns the processed response.
 * @param {String} text The text for the AI to compute.
 * @param {Number} seed 
 * @param {Boolean} early_stopping 
 * @param {Number} length_penalty 
 * @param {Number} max_new_tokens 
 * @param {Boolean} do_sample 
 * @param {Number} top_p 
 * @returns {String} The text returned by the AI.
 */
const bloom = async (text: string, token = '', seed = 31, early_stopping = false, length_penalty = 0, max_new_tokens = 20, do_sample = false, top_p = 0.9) => {
    if (!apiLock && Math.random() > 0.5) {
        apiLock = true;
        const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloom", {
            "headers": {
                'Authorization': token !== '' ? 'Bearer ' + token : ''
            },
            "body": JSON.stringify({
                "inputs": text,
                "parameters": {
                    "seed": seed,
                    "early_stopping": early_stopping,
                    "length_penalty": length_penalty,
                    "max_new_tokens": max_new_tokens,
                    "do_sample": do_sample,
                    "top_p": top_p
                }
            }),
            "method": "POST"
        });
        const res: any = await response.json();

        if (res.map) {
            apiLock = false;
            return res.map((e: any) => e.generated_text ? e.generated_text : e[0].generated_text).join(' ');
        } else {
            if (!sentThisSession) {
                sentThisSession = true;
                vscode.window.showErrorMessage('Reached free ratelimit for bloom usage...');
            }

            apiLock = false;
            return '';
        }
    } else {
        return '';
    }
};

export default class ParserBloom extends ParserAbstract {
    name = 'Bloom'

    provideInlineCodeCompletions = (text: string, filename: string, huggingface_token = '') => {
        return new Promise<string>(async (resolve, reject) => {
            const Language = lang.languages[filename.split('.').pop() || ''];
            const textBeforeCursor = (Language !== '' ? 'Language: ' + Language + '\n\n' : '') + text;
            let output = (await bloom(textBeforeCursor, huggingface_token)).substring(textBeforeCursor.length);

            resolve(output);
        });
    }
}