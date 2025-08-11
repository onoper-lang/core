import { OnoperLexerToken } from '../models/tokens';
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

    expect(() => parser.execute([token1, token2, token3])).toThrow("Link with ID \"linked\" not found.");
});
