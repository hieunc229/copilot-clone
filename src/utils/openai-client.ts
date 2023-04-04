import fetch from "node-fetch";
import { getConfig } from "../config";

const config = getConfig();
const API_KEY = config.settings.openaiApiKey;

const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

export class OpenAIApiClient {
  async generateCode(prompt: string): Promise<any> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          prompt,
          max_tokens: 100,
          n: 5,
          stop: null,
          temperature: 0.5,
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
