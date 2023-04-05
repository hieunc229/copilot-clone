const keywords = ["def", "void", "int", "if", "else", "while", "return", "true", "false", "null", "this.", "print", "do"];
const high_confidence_keywords = ['#!/bin/bash', 'select *', 'select ?', 'select count', '* from', '? from', 'where',
    'order by', 'group by', 'left join', 'right join', 'inner join', 'outer join', 'exec '];
const symbol_keywords = ["=>", "==", "!=", ">", "<", ">=", "<=", "&&", "||"];
const low_confidence_keywords = ['trace', 'error', 'exception', 'warn'];

function countOccurrences(input: string, char: string): number {
    return input.split(char).length - 1;
}

function countKeywordOccurrences(input: string, keywords: string[]): number {
    let count = 0;
    input.split(' ').map(n => n.replace('\n', '')).filter(n => n !== '').forEach(word => {
        if (keywords.includes(word)) {
            count++;
        }
    });
    return count;
}

function countSymbolOccurrences(input: string, symbols: string[]): number {
    let count = 0;
    symbols.forEach(symbol => {
        if (input.includes(symbol)) {
            count++;
        }
    });
    return count;
}

// Check whether the input should be considered as code input or random text
export function isCodeValid(input: string): boolean {
    input = input.toLowerCase();

    const openAngle = countOccurrences(input, '<');
    const closedAngle = countOccurrences(input, '>');

    const openBrackets = countOccurrences(input, '[');
    const closedBrackets = countOccurrences(input, ']');

    const openCurly = countOccurrences(input, '{');
    const closedCurly = countOccurrences(input, '}');

    const openParen = countOccurrences(input, '(');
    const closedParen = countOccurrences(input, ')');

    const bracketTotal = openAngle + closedAngle + openBrackets + closedBrackets + openCurly + closedCurly + openParen + closedParen;
    const inequality = -Math.abs(openAngle - closedAngle) -
        Math.abs(openBrackets - closedBrackets) -
        Math.abs(openCurly - closedCurly) -
        Math.abs(openParen - closedParen);

    const semicolons = countOccurrences(input, ';');
    const colons = countOccurrences(input, ':');

    const quotes = countOccurrences(input, '"');
    const singleQuotes = countOccurrences(input, "'");

    const keywordsFound = countKeywordOccurrences(input, keywords);
    const highKeywordsFound = countKeywordOccurrences(input, high_confidence_keywords);
    const lowKeywordsFound = countKeywordOccurrences(input, low_confidence_keywords);

    const symbolsFound = countSymbolOccurrences(input, symbol_keywords);

    let confidence = 0;
    confidence += bracketTotal > 0 ? .5 : -.5;
    confidence += input.length > 8 ? .5 : -.3;
    confidence += (inequality < 0 ? inequality / 10 : bracketTotal == 0 ? 0 : .3 * bracketTotal) * (20 / input.length);
    confidence += semicolons > 0 ? 1 : -.5;
    confidence += colons > 0 ? .2 : -.2;
    confidence += keywordsFound * .7;
    confidence += 3 * highKeywordsFound;
    confidence += -2 * lowKeywordsFound;
    confidence += symbolsFound;
    confidence += input.endsWith(';') ? .7 : 0;
    confidence += quotes > 0 ? .5 : 0;
    confidence += singleQuotes > 0 ? .5 : 0;

    return confidence >= 1;
}
