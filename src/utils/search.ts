import { OpenAIApiClient } from './openai-client';

const openaiClient = new OpenAIApiClient();

export async function search(searchPhrase: string) {
  try {
    const response = await openaiClient.generateCode(searchPhrase);
    if (response && response.choices) {
        const results = response.choices.map((choice: { message: { content: string }; }) => ({
            sourceURL: 'ChatGPT',
            code: choice.message.content.trim(),
          }));
      return { results };
    }
  } catch (error: any)  {
    throw new Error(`Error searching with ChatGPT: ${error.message}`);
  }
}
