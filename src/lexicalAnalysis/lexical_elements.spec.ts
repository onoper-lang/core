import { expect, test, beforeEach } from "bun:test";
import { OnoperLexicalAnalysis } from "./lexicalAnalysis";
import type { OnoperToken } from "./tokenModel";
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

test("Should parse TASKs with correct", () => {
    const content = (
        `Onboarding cliente\n` +
        `  Coletar Docs\n` +
        `Criar conta\n` +
        `  Confirmar dados`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente" }],
        [{ type: "TASK", value: "Coletar Docs" }],
        [{ type: "TASK", value: "Criar conta" }],
        [{ type: "TASK", value: "Confirmar dados" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(4);
});

test("Lexer should parse TASKs with links and CLAIMs", () => {
    const content = (
        `Suporte\n` +
        `  Receber chamado\n` +
        `    ! Processo manual demais\n` +
        `  Registrar ocorrência`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Suporte" }],
        [{ type: "TASK", value: "Receber chamado" }],
        [{ type: "CLAIM", value: "Processo manual demais" }],
        [{ type: "TASK", value: "Registrar ocorrência" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(4);
});

test("Should parse Tasks with comments", () => {
    const content = (
        `Onboarding cliente\n` +
        `  Coletar Docs\n` +
        `    # Cliente não envia docs\n` +
        `  Criar conta`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente" }],
        [{ type: "TASK", value: "Coletar Docs" }],
        [{ type: "COMMENT", value: "Cliente não envia docs" }],
        [{ type: "TASK", value: "Criar conta" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(4);
});

test("Shold parser Tasks with links", () => {
    const content = (
        `onboarding cliente\n` +
        `  [collect_docs]Coletar Docs\n` +
        `    ! Cliente não envia docs\n` +
        `  Criar conta\n` +
        `  [confirm_data]Confirmar dados\n` +
        `    > Suporte`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "onboarding cliente" }],
        [{ type: "NAMED", value: "collect_docs" }, { type: "TASK", value: "Coletar Docs" }],
        [{ type: "CLAIM", value: "Cliente não envia docs" }],
        [{ type: "TASK", value: "Criar conta" }],
        [{ type: "NAMED", value: "confirm_data" }, { type: "TASK", value: "Confirmar dados" }],
        [{ type: "LINK", value: "Suporte" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(6);
});

test("Should parse version and ident", () => {
    const content = (
        `version: 1\n` +
        `ident: 4`
    )

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "VERSION", value: "1" }],
        [{ type: "IDENT", value: "4" }]
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(2);
});

test("Should parse mixed content with version and ident", () => {
    const content = (`
version: 1
ident: 2

Onboarding cliente
[test2] Coletar Docs
  ! Cliente não envia docs
Suporte
  ! Um erro
  [test]Receber chamado
  Finalizar chamado`)

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "VERSION", value: "1" }],
        [{ type: "IDENT", value: "2" }],
        [{ type: "TASK", value: "Onboarding cliente" }],
        [{ type: "NAMED", value: "test2" }, { type: "TASK", value: "Coletar Docs" }],
        [{ type: "CLAIM", value: "Cliente não envia docs" }],
        [{ type: "TASK", value: "Suporte" }],
        [{ type: "CLAIM", value: "Um erro" }],
        [{ type: "NAMED", value: "test" }, { type: "TASK", value: "Receber chamado" }],
        [{ type: "TASK", value: "Finalizar chamado" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(9);
});