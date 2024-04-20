import OpenAIGenerator from "./ExtractorOpenAI";
import GithubGistExtractor from "./ExtractorGithubGist";
import StackoverflowExtractor from "./ExtractorStackOverflow";
import OpenRouterGenerator from "./ExtractorOpenRouter";

const SnippetExtractors = [
    new StackoverflowExtractor(),
    new GithubGistExtractor(),
    new OpenAIGenerator(),
    new OpenRouterGenerator()
];

export default SnippetExtractors;