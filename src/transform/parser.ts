import { OnoperElementMetaChar, OnoperLexerToken, type TokenType } from "../models/tokens";

const ERROR = {
    NOT_PERMITTED_IN_ROOT: (token: string) => `Token "${token}" is not permitted in the root level.`,
    CHILDREN_NOT_PERMITTED: (token: string) => `Token "${token}" cannot have children.`,
    NEED_PARENT_TASK: (token: string) => `Token "${token}" must be a child of a task.`,
    NOT_FOUND_ID: (id: string) => `Link with ID "${id}" not found.`,
    NOT_FOUND_TOKEN_IN_LEXER: () => `Tokens not found in the lexer.`,
}

const PERMISSIONS = {
    NOT_PERMITTED_IN_ROOT: new Set(["CLAIM", "LINK", "COMMENT"]),
    CHILDREN_NOT_PERMITTED: new Set(["CLAIM", "LINK", "COMMENT"]),
    NEED_PARENT_TASK: new Set(["CLAIM", "LINK", "COMMENT"]),
}

export class OnoperParser {
    private viewedLexedList: OnoperLexerToken[] = [];
    private searchedIds: Map<string, number> = new Map();
    
    public execute(lexedList: OnoperLexerToken[]): void {
        for (let index = 0; index < lexedList.length; index++) {
            const lexedItem = lexedList[index];
            if (!lexedItem) continue;

            for (const token of lexedItem.getTokens()) {
                const tokenTypesByFind = Object.keys(OnoperElementMetaChar);
                const tokensWithoutChildren = tokenTypesByFind.filter(t => t !== "TASK");

                const searchedLexedItem = this.viewedLexedList.findLast((viewedItem) => (
                    viewedItem.position.ident < lexedItem.position.ident
                ));
                
                if (PERMISSIONS.NOT_PERMITTED_IN_ROOT.has(token.type) && !searchedLexedItem) {
                    throw new Error(ERROR.NOT_PERMITTED_IN_ROOT(token.type));
                }

                if (searchedLexedItem) {
                    const searchedTokens = searchedLexedItem.getTokens();
                    if (!searchedTokens) {
                        throw new Error(ERROR.NOT_FOUND_TOKEN_IN_LEXER());
                    }

                    if (PERMISSIONS.NEED_PARENT_TASK.has(token.type)) {
                        if (searchedTokens.filter(t => t.type === "TASK").length == 0) {
                            throw new Error(ERROR.NEED_PARENT_TASK(token.type));
                        }
                    }

                    for (const searchedToken of searchedTokens) {
                        if (PERMISSIONS.CHILDREN_NOT_PERMITTED.has(searchedToken.type)) {
                            throw new Error(ERROR.CHILDREN_NOT_PERMITTED(searchedToken.type));
                        }
                    }
                }

                if (token.type === "NAMED") {
                    const currentViews = this.searchedIds.get(token.value);
                    if (currentViews) this.searchedIds.set(token.value, currentViews - 1);
                    else this.searchedIds.set(token.value, -1);
                }

                if (token.type === "LINK") {
                    const currentViews = this.searchedIds.get(token.value);
                    if (currentViews) this.searchedIds.set(token.value, currentViews + 1);
                    else this.searchedIds.set(token.value, 1);
                }
            }

            this.viewedLexedList.push(lexedItem);
        }

        console.log("Searched IDs:", this.searchedIds);
        for (const [id, count] of this.searchedIds.entries()) {
            if (count > 0) {
                throw new Error(`Link with ID "${id}" not found.`);
            }
        }
    }
}