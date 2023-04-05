import SnippetExtractors from "./extractors";
import { SnippetResult } from "./extractors/ExtractorAbstract";
import { FetchPageResult, fetchPageTextContent } from "./fetchPageContent";
import { OpenAIApiClient } from './openai-client';
import { getConfig } from "../config";
import { updateStatusBarMessage, statusBarMessage } from './statusBarMessage';

const openaiClient = new OpenAIApiClient();

const cachedResults: { [keyword: string]: SnippetResult[] } = {};

export async function search(keyword: string): Promise<null | { results: SnippetResult[] }> {
  if (keyword in cachedResults) {
    return Promise.resolve({ results: cachedResults[keyword] });
  }

  const config = getConfig();
  let results: SnippetResult[] = [];
  let fetchResult: FetchPageResult;
 

  try {
    for (const i in SnippetExtractors) {
     
      const extractor = SnippetExtractors[i];
      console.log('extractor:',extractor);
      if (extractor.isEnabled()) {
        const urls = await extractor.extractURLFromKeyword(keyword);
        console.log('urls:',urls);
        for (const y in urls) {
          fetchResult = await fetchPageTextContent(urls[y]);
          console.log('fetchResult:',fetchResult);
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
          results = results.concat(extractor.extractSnippets(fetchResult));
          console.log('results:',results);

          //updateStatusBarMessage(`${extractor.name} (${y}/${urls.length}): ${results.length} results`, 2000);

          if (results.length >= config.settings.maxResults) {
            break;
          }
        }

        if (results.length >= config.settings.maxResults) {
          break;
        }
      }
    }
    console.log(results.length);
    if (results.length === 0) {
      // Search using AI if no results were found from the internet
      //console.log('Busca Chat GPT', keyword);
      try {
        const response = await openaiClient.generateCode(keyword);
        
        if (response && response.choices && response.choices.length > 0) {
          const code = response.choices[0].message.content.trim();
          
          //updateStatusBarMessage(`CaptainStack: loading results`, 2000);
          console.log(code);
          results =  [{ sourceURL: 'CaptainStack', code }];
          return { results: [{ sourceURL: 'CaptainStack', code }] };
          
        }
      } catch (error: any) {
        throw new Error(`Error searching with ChatGPT: ${error.message}`);
      }
      //updateStatusBarMessage(`CaptainStack: Start loading snippet results...`, 2000);
    }

    cachedResults[keyword] = results;
    //updateStatusBarMessage(`CaptainStack: Finished loading ${results.length} results`);

    return { results };
  } catch (err: any) {
    throw new Error(`Error searching for code snippets: ${err.message}`);
  }
}
