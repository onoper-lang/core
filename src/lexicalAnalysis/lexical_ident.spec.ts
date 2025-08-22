import { expect, test, beforeEach } from "bun:test";
import { OnoperLexicalAnalysis } from "./lexicalAnalysis";
import { OnoperConfigAnalysis } from "./configMetacaracteres";
import { OnoperCommonAnalysis } from "./commonMetacaracteres";

let configAnalysis: OnoperConfigAnalysis;
let commonAnalysis: OnoperCommonAnalysis;
let lexer: OnoperLexicalAnalysis;

beforeEach(() => {
    configAnalysis = new OnoperConfigAnalysis();
    commonAnalysis = new OnoperCommonAnalysis();
    lexer = new OnoperLexicalAnalysis(configAnalysis, commonAnalysis);
});

test("Should return error because has different ident sizes", () => {
    try {
        const content = (
            `version: 1\n` +
            `ident: 2\n\n` +
            `Onboarding cliente\n` +
            `   Coletar Docs\n` +  // ident 3 (error)
            `  Criar conta\n` +     // ident 2 (ok)
            `    Confirmar dados`    // ident 4 (error)
        )

        const result = lexer.execute(content);
        expect(result).toBeInstanceOf(Error);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Invalid whitespace length at line 5: 3 (expected multiple of 2)");
    }
});

test("Should return error because has different ident sizes in the same line", () => {
    try {
        const content = (
            `version: 1\n` +
            `ident: 2\n\n` +
            `Onboarding cliente\n` +
            `-[test2] Coletar Docs\n` +  // ident 2 (ok)
            `   ! Cliente não envia docs` + // ident 3 (error)
            `Suporte\n` + 
            `  ! Um erro\n` + 
            `  [test]Receber chamado\n` + 
            `  Finalizar chamado`
        )

        const result = lexer.execute(content);
        expect(result).toBeInstanceOf(Error);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Invalid whitespace length at line 6: 3 (expected multiple of 2)");
    }
});

test("Should return error because has different ident sizes in the same line with comments", () => {
    try {
        const content = (
            `version: 1\n` +
            `ident: 2\n\n` +
            `Onboarding cliente\n` +
            `-[test2] Coletar Docs\n` +  // ident 2 (ok)
            `   # Cliente não envia docs\n` + // ident 3 (error)
            `Suporte\n` + 
            `  ! Um erro\n` + 
            `  [test]Receber chamado\n` + 
            `  Finalizar chamado`
        )

        const result = lexer.execute(content);
        expect(result).toBeInstanceOf(Error);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Invalid whitespace length at line 6: 3 (expected multiple of 2)");
    }
});

test("Should return error because has different ident sizes in the same line with comments and empty lines", () => {
    try {
        const content = (
            `version: 1\n` +
            `ident: 2\n\n` +
            `Onboarding cliente\n` +
            `-[test2] Coletar Docs\n` +  // ident 2 (ok)
            `   # Cliente não envia docs\n` + // ident 3 (error)
            `\n` + // empty line
            `Suporte\n` + 
            `  ! Um erro\n` + 
            `  [test]Receber chamado\n` + 
            `  Finalizar chamado`
        )

        const result = lexer.execute(content);
        expect(result).toBeInstanceOf(Error);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Invalid whitespace length at line 6: 3 (expected multiple of 2)");
    }
});

test("Should return success with valid content", () => {
    const content = (
        `version: 1\n` +
        `ident: 2\n\n` +
        `Onboarding cliente\n` +
        `-[test2] Coletar Docs\n` +  // ident 2 (ok)
        `  ! Cliente não envia docs\n` + // ident 2 (ok)
        `Suporte\n` + 
        `  ! Um erro\n` + 
        `  [test]Receber chamado\n` + 
        `  Finalizar chamado`
    );

    const result = lexer.execute(content);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
});