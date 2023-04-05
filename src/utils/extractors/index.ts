import GithubGistExtractor from "./ExtractorGithubGist";
import StackoverflowExtractor from "./ExtractorStackOverflowAPI";

const SnippetExtractors = [
    new StackoverflowExtractor(),
    new GithubGistExtractor()
];

export default SnippetExtractors;