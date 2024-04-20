import OpenAI from "openai";
import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";
import { FetchPageResult } from "../fetchPageContent";

export default class OpenRouterGenerator extends ExtractorAbstract {
  name = "OpenRouter";
  URL = "openrouter.ai";

  /**
   * Return a list of Source URLs from Google Search's result
   */
  generateCode = async (
    keyword: string,
    settings: { apiKey: string; model: string; systemPropmt: string }
  ): Promise<string[]> => {
    const {
      model,
      systemPropmt,
      ...props
    } = settings;

    const openai = new OpenAI({
      ...props,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "gasbyai.com",
        "X-Title": "GasbyAI",
      },
    });

    const out = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPropmt },
        { role: "user", content: keyword },
      ],
    });

    return out.choices.map((c) => c.message.content || "");
  };

  extractSnippets = (options: FetchPageResult): SnippetResult[] => {
    return [];
  };
}
