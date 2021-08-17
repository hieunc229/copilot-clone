import GithubGistExtractor from "./ExtractorGithubGist";
import StackoverflowExtractor from "./ExtractorStackOverflow";
import IdeoneExtractor from "./ExtractorIdeone";

const SnippetExtractors = [
    new StackoverflowExtractor(),
    new GithubGistExtractor(),
    new IdeoneExtractor()
];

export default SnippetExtractors;
