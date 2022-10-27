import BloomParser from "./ParserBloom";
import ParserAbstract from './ParserAbstract';

const SnippetParsers : ParserAbstract[] = [
    new BloomParser()
];

export default SnippetParsers;