import OpenAI from "openai";
import ExtractorAbstract, { SnippetResult } from "./ExtractorAbstract";
import { FetchPageResult } from "../fetchPageContent";

export default class OpenAIGenerator extends ExtractorAbstract {
  name = "OpenAI";
  URL = "openai.com";

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

    const openai = new OpenAI(props);

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
