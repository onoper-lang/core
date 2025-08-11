export const OnoperConfigMetaChar = {
    VERSION: "version:",
    IDENT: "ident:"
}

export const OnoperAttributeMetaChar = {
    NAMED: `\[(\w+)\]`
}

export const OnoperElementMetaChar = {
    TASK: `\-`,
    LINK: `\>`,
    CLAIM: `\!`,
    COMMENT: `\#`
}

export const OnoperMetachar = {
    ...OnoperConfigMetaChar,
    ...OnoperAttributeMetaChar,
    ...OnoperElementMetaChar
}

export type TokenType = keyof typeof OnoperMetachar;

export interface OnoperToken {
    type: TokenType;
    value: string;
    position: {
        line: number;
        ident: number;
    };
}

export class OnoperLexerToken{
    private tokens: OnoperToken[] = [];

    constructor(tokens: OnoperToken[] = []) {
        this.tokens = tokens;
    }

    addToken(type: TokenType, value: string, line: number, ident: number): void {
        this.tokens.push({
            type,
            value,
            position: { line, ident }
        });
    }

    getTokens(): OnoperToken[] {
        return this.tokens;
    }
}