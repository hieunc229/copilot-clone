import fetch from "node-fetch";
import { getConfig } from "../config";

const config = getConfig();
const API_KEY = config.settings.openaiApiKey;
const API_URL = "https://api.openai.com/v1/chat/completions";

export class OpenAIApiClient {
  async generateCode(prompt: string): Promise<any> {
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": `Actua siempre desarrollador web senior en todos los lenjuajes de programacion, tendras la capacidad de escribir codigo fuente, limpio y funcional, genera un solo bloque de codigo en formato markdown, no des tus opiniones solo crea el codigo, a partir de esta propuesta que te indico, omite "//find",  aca  lo que necesito: ${prompt}`}],
            "temperature": 0.5,
            "max_tokens" : 100
              
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
