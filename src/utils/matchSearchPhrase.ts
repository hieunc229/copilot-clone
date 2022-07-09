import CSConfig from "../config";
import { window } from "vscode";


type SearchMatchResult = {
    commentSyntax: string,
    commentSyntaxEnd: string,
    searchPhrase: string,
}

/**
 * Match the giving string with search pattern
 * @param {string} input
 * @returns {SearchMatchResult | undefined} if found, return the search phrase, comment's opening and closing syntax
 */
export function matchSearchPhrase(input: string): SearchMatchResult | undefined {
    const match = CSConfig.SEARCH_PATTERN.exec(input);

    if (match && match.length > 2) {

        const [_, commentSyntax, searchPhrase, commentSyntaxEnd] = match;

        // Find file type by file extension in path using vscode api and cut off everything before the last dot
        // @ts-ignore

        let fileType = window.activeTextEditor.document.languageId;

        if (fileType === "plaintext") {
            fileType = ""
        }

        console.log(`${searchPhrase} ${fileType}`);
        
        return {
            commentSyntax,
            commentSyntaxEnd,
            searchPhrase: `${searchPhrase} ${fileType}`
        };
    }

    return undefined;
}