import { ERROR } from "./error";
import { OnoperAttributeMetaChar, OnoperElementMetaChar, OnoperLexerToken, type OnoperElementType } from "./tokenModel";

export class OnoperCommonAnalysis {
    private createCommonRegex(): RegExp {
        const elementMetachar = Object.keys(OnoperElementMetaChar).join('|');
        const attributeMetachar = Object.keys(OnoperAttributeMetaChar).join('|');
        const regex = `( {0,})(${elementMetachar})? {0,}?(${attributeMetachar})? {0,}?([a-z]|[A-Z].*)`;
        return new RegExp(regex);
    }

    private getElementData(content: string, line: number) {
        const match = content.match(this.createCommonRegex());
        if (!match) {
            throw new Error(ERROR.NO_MATCH(line + 1, content));
        }

        let [_1, _whitespace, _elementValue, _attributeValue, _value] = match;

        const elementValue = (_elementValue || '-') as OnoperElementType
        const whitespace = _whitespace || "";
        const attributeValue = _attributeValue?.trim();
        const value = _value?.trim();


        const element = OnoperElementMetaChar[elementValue];
        if (!element)
            throw new Error(ERROR.UNKNOWN_ELEMENT(elementValue, line + 1));

        if (!value)
            throw new Error(ERROR.NO_VALUE(line + 1));

        return {
            element: element,
            attribute: attributeValue,
            value: value,
            whitespace: whitespace
        }
    }

    extractToken(
        identSize: number,
        content: string,
        line: number
    ): OnoperLexerToken {
        const { element, attribute, value, whitespace } = this.getElementData(content, line);
        
        if (whitespace.length % identSize !== 0)
            throw new Error(ERROR.INVALID_WHITESPACE(line + 1, whitespace.length, identSize));
        const ident = whitespace.length / identSize;

        
        const token = new OnoperLexerToken([], line, ident);
        
        if (attribute) {
            const attributeValue = attribute.replace(/^\[|\]$/g, '').trim();
            token.addToken("NAMED", attributeValue);
        }

        token.addToken(element, value.trim());
        return token;
    }
}