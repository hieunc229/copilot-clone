import fetch from "node-fetch";
import { getConfig } from "../config";

const config = getConfig();
//const API_KEY = config.settings.openaiApiKey;
const API_KEY ="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";
const API_URL = "https://api.openai.com/v1/chat/completions";

export class OpenAIApiClient {
  async generateCode(prompt: string): Promise<any> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": `${prompt}`}],
            "temperature": 0.7
              
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error generating code with ChatGPT: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
        throw new Error(`Error generating code with ChatGPT: ${error.message}`);
      }
    }
  }
