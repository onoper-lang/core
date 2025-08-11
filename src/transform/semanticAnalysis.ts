import { OnoperLexerToken } from "../models/tokens";

const ERROR = {
    // Change format with found linked names.
    LINKED_NAME_NOT_FOUND: (id: string) => `Link with ID "${id}" not found.`,
    //DUPLICATE_NAMED: (name: string) => `Named token "${name}" is duplicated.`,
}

export class OnoperSemanticAnalysis {
    private searchedIds: Map<string, number> = new Map();
    
    public execute(lexedList: OnoperLexerToken[]): void {
        for (let index = 0; index < lexedList.length; index++) {
            const lexedItem = lexedList[index];
            if (!lexedItem) continue;

            for (const token of lexedItem.getTokens()) {
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
        }

        for (const [id, count] of this.searchedIds.entries()) {
            if (count > 0) {
                throw new Error(ERROR.LINKED_NAME_NOT_FOUND(id));
            }
        }
    }
}