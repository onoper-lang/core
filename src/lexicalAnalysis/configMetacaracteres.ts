import { ERROR } from "./error";
import { OnoperConfigMetaChar, OnoperLexerToken, type ConfigTokenType } from "./tokenModel";

export class OnoperConfigAnalysis {
    public version?: number;
    public identSize?: number;

    private createConfigRegex(): RegExp {
        const configMetaChar = Object.keys(OnoperConfigMetaChar).join('|');
        const regex = `(${configMetaChar})( +)(.*)`;
        return new RegExp(regex);
    }
    
    extractToken(content: string, line: number): OnoperLexerToken | null {
        const regex = this.createConfigRegex();
        if (!regex) throw new Error(ERROR.CONFIG_REGEX_NOT_DEFINED());

        let match = content.match(regex);
        if (!match) return null;

        const token = new OnoperLexerToken([], line, 0);
        const [_1, _metaChar, spaces, _value] = match;

        const metaChar = _metaChar as ConfigTokenType;
        const value = _value?.trim();

        if (!metaChar || !value) return null;

        const type = OnoperConfigMetaChar[metaChar];

        if (metaChar === "ident:" && value)
            this.identSize = parseInt(value, 10);
        if (metaChar === "version:" && value)
            this.version = parseInt(value, 10);
        token.addToken(type, value || "")
        return token;
    }
}