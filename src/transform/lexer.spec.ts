import { expect, test } from "bun:test";
import { OnoperLexer } from "./lexer";
import type { OnoperToken } from "../models/tokens";

const lexer = new OnoperLexer();

test("Lexer should parse version and ident size", () => {
    const content = (
        `version: 1\n` +
        `ident: 4`
    )

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "VERSION", value: "1", position: { line: 0, ident: 0 } }],
        [{ type: "IDENT", value: "4", position: { line: 1, ident: 0 } }]
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(2);
});

test("Lexer should parse TASKs with ident size", () => {
    const content = 
`Onboarding cliente
    Coletar Docs
        Criar conta
    Confirmar dados`;

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente", position: { line: 0, ident: 0 } }],
        [{ type: "TASK", value: "Coletar Docs", position: { line: 1, ident: 1 } }],
        [{ type: "TASK", value: "Criar conta", position: { line: 2, ident: 2 } }],
        [{ type: "TASK", value: "Confirmar dados", position: { line: 3, ident: 1 } }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(4);
});

test("Lexer should parse TASKs with links and CLAIMs", () => {
    const content = 
`Suporte
    Receber chamado
        ! Processo manual demais
    Registrar ocorrência`;

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Suporte", position: { line: 0, ident: 0 } }],
        [{ type: "TASK", value: "Receber chamado", position: { line: 1, ident: 1 } }],
        [{ type: "CLAIM", value: "Processo manual demais", position: { line: 2, ident: 2 } }],
        [{ type: "TASK", value: "Registrar ocorrência", position: { line: 3, ident: 1 } }]
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(4);
});

test("Lexer should parse TASKs with NAMED entities", () => {
    const content = 
`Suporte
    -[register_occurrence] Registrar ocorrência`;

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Suporte", position: { line: 0, ident: 0 } }],
        [{ type: "NAMED", value: "register_occurrence", position: { line: 1, ident: 1 } }, { type: "TASK", value: "Registrar ocorrência", position: { line: 1, ident: 1 } }]
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(2);
});

test("Lexer should handle TASKs with links and CLAIMs", () => {
    const content = 
`Onboarding cliente
    [collect_docs]Coletar Docs
        ! Cliente não envia docs
    Criar conta
    [confirm_data]Confirmar dados
        > Suporte`;
    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente", position: { line: 0, ident: 0 } }],
        [{ type: "NAMED", value: "collect_docs", position: { line: 1, ident: 1 } }, { type: "TASK", value: "Coletar Docs", position: { line: 1, ident: 1 } }],
        [{ type: "CLAIM", value: "Cliente não envia docs", position: { line: 2, ident: 2 } }],
        [{ type: "TASK", value: "Criar conta", position: { line: 3, ident: 1 } }],
        [{ type: "NAMED", value: "confirm_data", position: { line: 4, ident: 1 } }, { type: "TASK", value: "Confirmar dados", position: { line: 4, ident: 1 } }],
        [{ type: "LINK", value: "Suporte", position: { line: 5, ident: 2 } }]
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(6);
});

test("Lexer should handle empty content", () => {
    const content = "";
    const result = lexer.execute(content);
    expect(result).toEqual([]);
});

