const keywords = ["def", "void", "int", "if", "else", "while", "return", "true", "false", "null", "this"];

// Check whether the input should be considered as code input or random text
export function isCodeValid(input: string): boolean {
    const openAngle = input.split('<').length - 1;
    const closedAngle = input.split('>').length - 1;

    const openBrackets = input.split('[').length - 1;
    const closedBrackets = input.split(']').length - 1;

    const openCurly = input.split('{').length - 1;
    const closedCurly = input.split('}').length - 1;

    const openParen = input.split('(').length - 1;
    const closedParen = input.split(')').length - 1;

    const total = openAngle + closedAngle + openBrackets + closedBrackets + openCurly + closedCurly + openParen + closedParen;

    const inequality = -Math.abs(openAngle - closedAngle) -
        Math.abs(openBrackets - closedBrackets) -
        Math.abs(openCurly - closedCurly) -
        Math.abs(openParen - closedParen);

    const semicolons = input.split(';').length - 1;
    const colons = input.split(':').length - 1;

    let keywordsFound = 0;

    input.split(' ').forEach(word => {
        if (keywords.includes(word)) {
            keywordsFound++;
            return false;
        }
    });

    let confidence = 0;
    confidence += total > 0 ? .5 : -.5;
    confidence += input.length > 6 ? .5 : -.1;
    confidence += inequality < 0 ? inequality / 10 : total == 0 ? 0 : .6 * total / 2;
    confidence += semicolons > 0 ? .5 : -.5;
    confidence += colons > 0 ? .2 : -.2;
    confidence += keywordsFound > 0 ? .7 : 0;

    return confidence >= 1;
}