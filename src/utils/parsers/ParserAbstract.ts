import { getConfig } from "../../config";

type codeCompletion = (text : string, filename : string, huggingface_token? : string) => Promise<string>;

export default abstract class ParserAbstract {
    abstract name: string;

    isEnabled() {
        const config = getConfig();
        return this.name in config.settings.parsers && config.settings.parsers[this.name];
    }

    abstract provideInlineCodeCompletions : codeCompletion;
}