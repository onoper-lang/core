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

test("Should parse unnamed tasks", () => {
    const content = (
        `Onboarding cliente`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(1);
});

test("Should parser unnamed task with metacharacters", () => {
    const content = (
        `- Onboarding cliente`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(1);
});

test("Should parser named task with metacharacters", () => {
    const content = (
        `- [onboarding] Onboarding cliente`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "NAMED", value: "onboarding" }, { type: "TASK", value: "Onboarding cliente" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(1);
});

test("Should parse named tasks without metacharacters", () => {
    const content = (
        `[onboarding] Onboarding cliente`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "NAMED", value: "onboarding" }, { type: "TASK", value: "Onboarding cliente" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(1);
});

test("Should parse tasks with different ident sizes", () => {
    const content = (
        `Onboarding cliente\n` +
        `  Coletar Docs\n` +
        `    Criar conta`
    );

    const result = lexer.execute(content);
    const expected: OnoperToken[][] = [
        [{ type: "TASK", value: "Onboarding cliente" }],
        [{ type: "TASK", value: "Coletar Docs" }],
        [{ type: "TASK", value: "Criar conta" }],
    ];

    expect(result.map((ent) => ent.getTokens())).toEqual(expected);
    expect(result.length).toBe(3);
});