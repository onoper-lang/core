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
        [{ type: "VERSION", value: "1" }],
        [{ type: "IDENT", value: "4" }]
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
        [{ type: "TASK", value: "Onboarding cliente" }],
        [{ type: "TASK", value: "Coletar Docs" }],
        [{ type: "TASK", value: "Criar conta" }],
        [{ type: "TASK", value: "Confirmar dados" }],
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
        [{ type: "TASK", value: "Suporte" }],
        [{ type: "TASK", value: "Receber chamado" }],
        [{ type: "CLAIM", value: "Processo manual demais" }],
        [{ type: "TASK", value: "Registrar ocorrência" }]
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
        [{ type: "TASK", value: "Suporte" }],
        [{ type: "NAMED", value: "register_occurrence" }, { type: "TASK", value: "Registrar ocorrência" }]
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
        [{ type: "TASK", value: "Onboarding cliente" }],
        [{ type: "NAMED", value: "collect_docs" }, { type: "TASK", value: "Coletar Docs" }],
        [{ type: "CLAIM", value: "Cliente não envia docs" }],
        [{ type: "TASK", value: "Criar conta" }],
        [{ type: "NAMED", value: "confirm_data" }, { type: "TASK", value: "Confirmar dados" }],
        [{ type: "LINK", value: "Suporte" }]
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(6);
});

test("Lexer should handle empty content", () => {
    const content = "";
    const result = lexer.execute(content);
    expect(result).toEqual([]);
});

