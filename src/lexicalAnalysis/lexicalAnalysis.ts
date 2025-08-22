import { OnoperLexerToken } from "./tokenModel";
import type { OnoperCommonAnalysis } from "./commonMetacaracteres";
import type { OnoperConfigAnalysis } from "./configMetacaracteres";
import { ERROR } from "./error";

export class OnoperLexicalAnalysis {
    private passConfigChar: boolean = false;
    public version: number = 1;
    public identSize: number = 2;

    constructor(
        private ConfigAnalysis: OnoperConfigAnalysis,
        private CommonAnalysis: OnoperCommonAnalysis
    ) { }

    private extractToken (content: string, line: number): OnoperLexerToken {
        if (this.passConfigChar === false) {
            const version = this.ConfigAnalysis.version;
            const identSize = this.ConfigAnalysis.identSize;
            const token = this.ConfigAnalysis.extractToken(content, line);

            if (version) this.version = version;
            if (identSize) this.identSize = identSize;
            if (token) return token;
        }
        this.passConfigChar = true;

        return this.CommonAnalysis.extractToken(
            this.identSize,
            content,
            line
        );
    }

    execute(content_raw: string): OnoperLexerToken[]{
        const tokens: OnoperLexerToken[] = [];
        const lines = content_raw.split("\n");

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const content = lines[lineIndex];
            if (!content) continue;

            const token = this.extractToken(content, lineIndex);

            if (!token) {
                console.error(ERROR.FAILED_TO_PARSE_LINE(lineIndex, content));
                continue;
            }

            tokens.push(token);
        }

        return tokens;
    }
}