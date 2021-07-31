import GithubGistExtractor from "./ExtractorGithubGist";
import StackoverflowExtractor from "./ExtractorStackOverflow";

const SnippetExtractors = [
    new StackoverflowExtractor(),
    new GithubGistExtractor()
];

export default SnippetExtractors;