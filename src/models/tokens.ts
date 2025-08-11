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
}

export class OnoperLexerToken{
    private tokens: OnoperToken[] = [];
    position: {
        line: number;
        ident: number;
    };

    constructor(tokens: OnoperToken[] = [], line: number = 0, ident: number = 0) {
        this.tokens = tokens;
        this.position = { line, ident };
    }

    addToken(type: TokenType, value: string): void {
        this.tokens.push({
            type,
            value
        });
    }

    getTokens(): OnoperToken[] {
        return this.tokens;
    }
}