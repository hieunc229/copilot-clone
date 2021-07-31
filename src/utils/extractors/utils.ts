

// Check whether the input should be considered as code input or random text
export function isCodeValid(input: string) {

    // This is just a temporary solution,
    // it would filter codes that are too short
    return input.length > 12;
}