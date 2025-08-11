import { OnoperLexerToken } from '../models/tokens';
import { expect, test } from "bun:test";
import { OnoperSyntacticAnalysis } from "./syntacticAnalysis";

test("should error because claims, linked and comments need to be children of a task", () => {
    const parser = new OnoperSyntacticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("CLAIM", "claim");
    const token2 = new OnoperLexerToken([], 1, 0);
    token2.addToken("LINK", "linked");
    const token3 = new OnoperLexerToken([], 2, 0);
    token3.addToken("COMMENT", "comment");

    expect(() => parser.execute([token1, token2, token3])).toThrow("Token \"CLAIM\" is not permitted in the root level.");
});

test("should error because comments, claims and linked cannot have children", () => {
    const parser = new OnoperSyntacticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task");

    const token2 = new OnoperLexerToken([], 1, 1);
    token2.addToken("CLAIM", "claim");
    const token3 = new OnoperLexerToken([], 2, 2);
    token3.addToken("TASK", "sub-task1");

    const token4 = new OnoperLexerToken([], 3, 1);
    token4.addToken("LINK", "linked");
    const token5 = new OnoperLexerToken([], 4, 2);
    token5.addToken("TASK", "sub-task2");

    const token6 = new OnoperLexerToken([], 5, 1);
    token6.addToken("COMMENT", "comment");
    const token7 = new OnoperLexerToken([], 6, 2);
    token7.addToken("TASK", "sub-task3");

    const token8 = new OnoperLexerToken([], 7, 0);
    token8.addToken("TASK", "task2");
    token8.addToken("NAMED", "linked");

    const tokens = [token1, token2, token3, token4, token5, token6, token7, token8];
    expect(() => parser.execute(tokens)).toThrow("Token \"CLAIM\" cannot have children.");
});

test("linked with valid ID", () => {
    const parser = new OnoperSyntacticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    token1.addToken("NAMED", "linked");
    const token2 = new OnoperLexerToken([], 1, 1);
    token2.addToken("CLAIM", "have a claim");
    const token3 = new OnoperLexerToken([], 2, 1);
    token3.addToken("COMMENT", "the problem is here");
    const token4 = new OnoperLexerToken([], 2, 1);
    token4.addToken("LINK", "linked2");

    const token5 = new OnoperLexerToken([], 3, 0);
    token5.addToken("TASK", "task2");
    const token6 = new OnoperLexerToken([], 4, 1);
    token6.addToken("LINK", "linked");

    const token7 = new OnoperLexerToken([], 5, 0);
    token7.addToken("TASK", "task3");
    token7.addToken("NAMED", "linked2");

    const tokens = [token1, token2, token3, token4, token5, token6, token7];

    expect(() => parser.execute(tokens)).not.toThrow();
});

test("should error because claims, links and comments need content", () => {
    const parser = new OnoperSyntacticAnalysis();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    token1.addToken("NAMED", "linked");
    const token2 = new OnoperLexerToken([], 1, 1);
    token2.addToken("LINK", "");

    const tokens = [token1, token2];

    expect(() => parser.execute(tokens)).toThrow("Token \"LINK\" must have content.");
});

