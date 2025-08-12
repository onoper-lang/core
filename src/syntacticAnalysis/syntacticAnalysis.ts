import { OnoperLexerToken, type TokenType } from "../models/tokens";

const ERROR = {
    NOT_PERMITTED_IN_ROOT: (token: string) => `Token "${token}" is not permitted in the root level.`,
    CHILDREN_NOT_PERMITTED: (token: string) => `Token "${token}" cannot have children.`,
    NEED_PARENT_TASK: (token: string) => `Token "${token}" must be a child of a task.`,
    NOT_FOUND_TOKEN_IN_LEXER: () => `Tokens not found in the lexer.`,
    //ELEMENT_WITHOUT_CONTENT: (token: string) => `Token "${token}" must have content.`,
}

const SYNTAX_PERMISSIONS = {
    NOT_PERMITTED_IN_ROOT: new Set(["CLAIM", "LINK", "COMMENT"]) as Set<TokenType>,
    CHILDREN_NOT_PERMITTED: new Set(["CLAIM", "LINK", "COMMENT"]) as Set<TokenType>,
    NEED_PARENT_TASK: new Set(["CLAIM", "LINK", "COMMENT"]) as Set<TokenType>,
    //ELEMENT_WITHOUT_CONTENT: new Set(["CLAIM", "LINK", "COMMENT", "TASK", "IDENT", "VERSION"]) as Set<TokenType>,
}

export class OnoperSyntacticAnalysis {
    private viewedLexedList: OnoperLexerToken[] = [];
    
    public execute(lexedList: OnoperLexerToken[]): void {
        for (let index = 0; index < lexedList.length; index++) {
            const lexedItem = lexedList[index];
            if (!lexedItem) continue;

            for (const token of lexedItem.getTokens()) {
                const searchedLexedItem = this.viewedLexedList.findLast((viewedItem) => (
                    viewedItem.position.ident < lexedItem.position.ident
                ));
                
                if (SYNTAX_PERMISSIONS.NOT_PERMITTED_IN_ROOT.has(token.type) && !searchedLexedItem) {
                    throw new Error(ERROR.NOT_PERMITTED_IN_ROOT(token.type));
                }

                if (searchedLexedItem) {
                    const searchedTokens = searchedLexedItem.getTokens();
                    if (!searchedTokens) {
                        throw new Error(ERROR.NOT_FOUND_TOKEN_IN_LEXER());
                    }

                    if (SYNTAX_PERMISSIONS.NEED_PARENT_TASK.has(token.type)) {
                        if (searchedTokens.filter(t => t.type === "TASK").length == 0) {
                            throw new Error(ERROR.NEED_PARENT_TASK(token.type));
                        }
                    }

                    for (const searchedToken of searchedTokens) {
                        if (SYNTAX_PERMISSIONS.CHILDREN_NOT_PERMITTED.has(searchedToken.type)) {
                            throw new Error(ERROR.CHILDREN_NOT_PERMITTED(searchedToken.type));
                        }
                    }
                }
            }

            this.viewedLexedList.push(lexedItem);
        }
    }
}