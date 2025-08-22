import { OnoperLexerToken } from '../lexicalAnalysis/tokenModel';
import { expect, test } from "bun:test";
import { OnoperSemanticAnalysis } from "./semanticAnalysis";

test("should error because linked needs a valid ID", () => {
    const parser = new OnoperSemanticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task");

    const token2 = new OnoperLexerToken([], 1, 1);
    token2.addToken("LINK", "linked");

    const token3 = new OnoperLexerToken([], 2, 0);
    token3.addToken("TASK", "test");
    token3.addToken("NAMED", "undefined");

    const tokens = [token1, token2, token3];

    expect(() => parser.execute(tokens)).toThrow("Link with ID \"linked\" not found.");
});


test("should error because has duplicated id", () => {
    const parser = new OnoperSemanticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    token1.addToken("NAMED", "linked");

    const token2 = new OnoperLexerToken([], 1, 0);
    token2.addToken("TASK", "task2");
    token2.addToken("NAMED", "linked");

    const tokens = [token1, token2];

    expect(() => parser.execute(tokens)).toThrow("Named token \"linked\" is duplicated.");
});

test("should not error because has valid linked id", () => {
    const parser = new OnoperSemanticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    token1.addToken("NAMED", "linked");

    const token2 = new OnoperLexerToken([], 1, 0);
    token2.addToken("TASK", "task2");
    token2.addToken("LINK", "linked");

    const tokens = [token1, token2];

    expect(() => parser.execute(tokens)).not.toThrow();
});
