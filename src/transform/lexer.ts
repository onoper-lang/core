import { OnoperAttributeMetaChar, OnoperConfigMetaChar, OnoperElementMetaChar, OnoperLexerToken, type TokenType } from "../models/tokens";

export class OnoperLexer {
    private passConfigChar: boolean = false;
    private identSize: number = 4;

    private createConfigRegex(): RegExp {
        const configMetaChar = Object.values(OnoperConfigMetaChar).join('|');
        const regex = `(${configMetaChar})( +)(.*)`;
        return new RegExp(regex);
    }

    private createCommonRegex(): RegExp {
        const elementMetachar = Object.values(OnoperElementMetaChar).join('|');
        const attributeMetachar = Object.values(OnoperAttributeMetaChar).join('|');

        const regex = `( {0,})(${elementMetachar})?(${attributeMetachar})?(.*)`;
        return new RegExp(regex);
    }

    private intentSelector(content: string, line: number): OnoperLexerToken {
        let match = content.match(this.createConfigRegex());
        const token = new OnoperLexerToken();

        if (this.passConfigChar === false && match) {
            const [_1, configChar, _2, value] = match;

            const type = Object.entries(OnoperConfigMetaChar)
                .find(([_, val]) => val === configChar)?.[0] as TokenType;

            if (!type || !value) {
                throw new Error(`Unknown config character: ${configChar}`);
            }

            if (type === "IDENT") {
                this.identSize = parseInt(value);
            }
            token.addToken(type, value.trim(), line, 0);

            return token;
        }
        
        this.passConfigChar = true;
        match = content.match(this.createCommonRegex());
        if (!match) throw new Error(`No match found for line: ${line}`);

        let [_1, whitespace, elementValue, attributeValue, value] = match;

        const element = Object.entries(OnoperElementMetaChar)
                .find(([_, val]) => val === elementValue)?.[0] as TokenType || undefined;

        const ident = whitespace ? whitespace.length / this.identSize : 0;

        if (!value) {
            throw new Error(`Unknown element or value at line ${line}: ${content}`);
        }

        if (value.startsWith("[")) {
            const localValue = value.split(/(\[|\])/g).filter((v) => v.trim() !== "");
            attributeValue = localValue[1];
            if (localValue[2] !== "]") {
                throw new Error(`Expected ']' at line ${line}, found: ${localValue[2]}`);
            }
            value = localValue[3];
        }

        if (!value) {
            throw new Error(`Unknown element or value at line ${line}: ${content}`);
        }

        if (attributeValue) {
            token.addToken("NAMED", attributeValue.trim(), line, ident);
        }

        token.addToken(element || "TASK", value.trim(), line, ident);
        return token;
    }

    execute(content_raw: string): OnoperLexerToken[]{
        const tokens: OnoperLexerToken[] = [];
        const lines = content_raw.split("\n");

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const content = lines[lineIndex];
            if (!content) continue;

            const token = this.intentSelector(content, lineIndex);

            if (!token) {
                console.error(`Failed to parse line ${lineIndex + 1}: ${content}`);
                continue;
            }

            tokens.push(token);
        }

        return tokens;
    }
}