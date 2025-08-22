import { ERROR } from "./error";

export const OnoperConfigMetaChar = {
    "version:": "VERSION",
    "ident:": "IDENT"
} as const;

export type ConfigTokenType = keyof typeof OnoperConfigMetaChar;

export const OnoperAttributeMetaChar = {
    "\\[.+\\]": "NAMED"
};

export const OnoperElementMetaChar = {
    "\-": "TASK",
    "\>": "LINK",
    "\!": "CLAIM",
    "\#": "COMMENT"
} as const;

export type OnoperElementType = keyof typeof OnoperElementMetaChar;

export const OnoperMetachar = {
    ...OnoperConfigMetaChar,
    ...OnoperAttributeMetaChar,
    ...OnoperElementMetaChar
} as const;

export type TokenTypeKey = keyof typeof OnoperMetachar;
export type TokenTypeValue = string;

export interface OnoperToken {
    type: TokenTypeValue;
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

    addToken(type: TokenTypeValue, value: string): void {
        const hasType = Object.values(OnoperMetachar).find((metaChar) => type === metaChar);
        if (!hasType) {
            throw new Error(ERROR.INVALID_TOKEN(this.position.line + 1, type));
        }
        
        this.tokens.push({
            type,
            value
        });
    }

    getTokens(): OnoperToken[] {
        return this.tokens;
    }
}