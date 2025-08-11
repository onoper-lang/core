import { expect, test } from "bun:test";
import { OnoperIntermediary } from "./intermediary";
import { OnoperLexerToken } from "../models/tokens";

test("OnoperIntermediary should transform tokens correctly", () => {
    const intermediary = new OnoperIntermediary();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    token1.addToken("NAMED", "linked");
    const token2 = new OnoperLexerToken([], 1, 1);
    token2.addToken("LINK", "test");

    const result = intermediary.execute([
        token1,
        token2
    ]);
    expect(result).toEqual({
        type: "ROOT",
        content: "Root",
        namedID: "",
        children: [
            {
                type: "TASK",
                content: "task1",
                namedID: "linked",
                children: [],
                UID: result.children[0]?.UID || "",
                links: ["test"],
                claims: [],
                comments: []
            }
        ],
        UID: result.UID,
        links: [],
        claims: [],
        comments: []
    });
});

test("OnoperIntermediary should handle empty tokens", () => {
    const intermediary = new OnoperIntermediary();

    const result = intermediary.execute([]);
    expect(result).toEqual({
        type: "ROOT",
        content: "Root",
        namedID: "",
        children: [],
        UID: result.UID,
        links: [],
        claims: [],
        comments: []
    });
});

test("OnoperIntermediary should handle multiple tasks", () => {
    const intermediary = new OnoperIntermediary();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    const token2 = new OnoperLexerToken([], 1, 0);
    token2.addToken("TASK", "task2");

    const result = intermediary.execute([token1, token2]);

    expect(result.children.length).toBe(2);
    for (const child of result.children || []) {
        expect(child.type).toBe("TASK");
        expect(child.content).toMatch(/task[12]/);
    }
});

test("OnoperIntermediary should handle named tokens", () => {
    const intermediary = new OnoperIntermediary();

    const token1 = new OnoperLexerToken([], 0, 0);
    token1.addToken("TASK", "task1");
    token1.addToken("NAMED", "named1");

    const result = intermediary.execute([token1]);

    expect(result.children.length).toBe(1);
    for (const child of result.children || []) {
        expect(child.type).toBe("TASK");
        expect(child.namedID).toBe("named1");
    }
});

test("linked with valid ID", () => {
    const intermediary = new OnoperIntermediary();

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

    const result = intermediary.execute(tokens);
    expect(result.children.length).toBe(3);
    for (const child of result.children || []) {
        expect(child.type).toBe("TASK");
        if (child.content === "task1") {
            expect(child.namedID).toBe("linked");
            expect(child.links.length).toBe(1);
            expect(child.links[0]).toBe("linked2");
            expect(child.claims.length).toBe(1);
            expect(child.claims[0]).toBe("have a claim");
            expect(child.comments.length).toBe(1);
            expect(child.comments[0]).toBe("the problem is here");
        } else if (child.content === "task2") {
            expect(child.links.length).toBe(1);
            expect(child.links[0]).toBe("linked");
        } else if (child.content === "task3") {
            expect(child.namedID).toBe("linked2");
        }
    }
});