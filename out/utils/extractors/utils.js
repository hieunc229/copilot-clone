"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCodeValid = void 0;
// Check whether the input should be considered as code input or random text
function isCodeValid(input) {
    // This is just a temporary solution,
    // it would filter codes that are too short
    return input.length > 12;
}
exports.isCodeValid = isCodeValid;
