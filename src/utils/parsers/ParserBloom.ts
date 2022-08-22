import ParserAbstract from './ParserAbstract';
import * as lang from './languages';
import fetch from 'node-fetch';

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
 const bloom = async (text : string, token : string = '', seed : number = 31, early_stopping : boolean = false, length_penalty : number = 0, max_new_tokens = 20, do_sample = false, top_p : number = 0.9) => {
    const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloom", {
        "headers": {
            'Authorization': 'Bearer ' + token
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
    const res : Array<any> = await response.json();

    return res.map((e : any) => e.generated_text ? e.generated_text : e[0].generated_text).join(' ');
};

export default class ParserBloom extends ParserAbstract {
    name = 'Bloom'

    provideInlineCodeCompletions = (text : string, filename : string, huggingface_token : string = '') => {
        return new Promise<string>(async (resolve, reject) => {
            const textBeforeCursor = 'Language: ' + lang.languages[filename.split('.').pop() || ''] + '\n\n' + text;
            let output = (await bloom(textBeforeCursor, huggingface_token)).substring(textBeforeCursor.length);
            while(output.startsWith('\n')) output = output.substring(1);

            resolve(output);
        })
    }
}