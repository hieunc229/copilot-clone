const keywords = ["def", "void", "int", "if", "else", "while", "return", "true", "false", "null", "this.", "print", "do", "", ""];
const high_confidence_keywords = ['#!/bin/bash', 'select *', 'select ?', 'select count', '* from', '? from', 'where',
    'order by', 'group by', 'left join', 'right join', 'inner join', 'outer join', 'exec '];
const symbol_keywords = ["=>", "==", "!=", ">", "<", ">=", "<=", "&&", "||"];
const low_confidence_keywords = ['trace', 'error', 'exception', 'warn'];

// Check whether the input should be considered as code input or random text
export function isCodeValid(input: string): boolean {
    input = input.toLowerCase();

    const openAngle = input.split('<').length - 1;
    const closedAngle = input.split('>').length - 1;

    const openBrackets = input.split('[').length - 1;
    const closedBrackets = input.split(']').length - 1;

    const openCurly = input.split('{').length - 1;
    const closedCurly = input.split('}').length - 1;

    const openParen = input.split('(').length - 1;
    const closedParen = input.split(')').length - 1;

    const bracketTotal = openAngle + closedAngle + openBrackets + closedBrackets + openCurly + closedCurly + openParen + closedParen;
    // calculate the inequality of brackets. the lower the number the more unequal
    const inequality = -Math.abs(openAngle - closedAngle) -
        Math.abs(openBrackets - closedBrackets) -
        Math.abs(openCurly - closedCurly) -
        Math.abs(openParen - closedParen);

    const semicolons = input.split(';').length - 1;
    const colons = input.split(':').length - 1;

    const quotes = input.split('"').length - 1;
    const singleQuotes = input.split("'").length - 1;

    let keywordsFound = 0;
    let highKeywordsFound = 0;
    let lowKeywordsFound = 0;
    let symbolsFound = 0;

    // test keywords
    input.split(' ').map(n => n.replace('\n', '')).filter(n => n != '').forEach(word => {
        if (keywords.includes(word)) {
            keywordsFound++;
        }
    });
    high_confidence_keywords.forEach(word => {
        if (input.includes(word)) {
            highKeywordsFound++;
        }
    });
    low_confidence_keywords.forEach(word => {
        if (input.includes(word)) {
            lowKeywordsFound++;
        }
    });
    symbol_keywords.forEach(symbol => {
        if (input.includes(symbol)) {
            symbolsFound++;
        }
    });

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