import * as vscode from 'vscode';
import * as lang from './languages';

try { process.removeAllListeners('warning'); } catch (e) { /* browser, probably. */ }

const DEBUG = false;

let run : Boolean = false

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
const bloom = async (text : string, seed = 31, early_stopping = false, length_penalty = 0, max_new_tokens = 20, do_sample = false, top_p = 0.9) => {
    const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloom", {
        "headers": {
            'Authorization': 'Bearer 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'
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
    DEBUG && console.log('Bloom: ', res)

    return res.map((e : any) => e.generated_text ? e.generated_text : e[0].generated_text).join(' ');
};

export function activate(_: vscode.ExtensionContext) {

    const provider: vscode.CompletionItemProvider = {
        // @ts-ignore
        provideInlineCompletionItems: async (document : vscode.TextDocument, position, context, token) => {

            const textBeforeCursor = 'Language: ' + lang.languages[document.fileName.split('.').pop() || ''] + '\n\n' + document.getText(
                new vscode.Range(position.with(0, 0), position)
            );

            if(run) {
                await new Promise((resolve, reject) => {
                    setInterval(() => {
                        if(!run) resolve(null);
                    }, 10)
                })

                run = false;
            }

            DEBUG && console.log('Bloom: Fetching data...')
            const output = (await bloom(textBeforeCursor)).substring(textBeforeCursor.length);
            DEBUG && console.log('Bloom: Done!')

            const items = [
                {
                    text: output,
                    insertText: output,
                    range: new vscode.Range(position.translate(0, output.length), position)
                }
            ];

            return {items};
        },
    };

    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
}
