import OpenAIGenerator from "./ExtractorOpenAI";
import GithubGistExtractor from "./ExtractorGithubGist";
import StackoverflowExtractor from "./ExtractorStackOverflow";
import OpenRouterGenerator from "./ExtractorOpenRouter";
import RequestyGenerator from "./ExtractorRequesty";

const SnippetExtractors = [
    new StackoverflowExtractor(),
    new GithubGistExtractor(),
    new OpenAIGenerator(),
    new OpenRouterGenerator(),
    new RequestyGenerator()
];

export default SnippetExtractors;