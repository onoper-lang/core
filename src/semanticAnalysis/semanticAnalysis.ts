import { OnoperLexerToken } from "../lexicalAnalysis/tokenModel";

const ERROR = {
    // Change format with found linked names.
    LINKED_NAME_NOT_FOUND: (id: string) => `Link with ID "${id}" not found.`,
    DUPLICATE_NAMED: (name: string) => `Named token "${name}" is duplicated.`,
}

export class OnoperSemanticAnalysis {
    private IDS_IN_SEASON = new Set<string>();
    private IDS_IN_LINK = new Set<string>();
    
    public execute(lexedList: OnoperLexerToken[]): void {
        for (let index = 0; index < lexedList.length; index++) {
            const lexedItem = lexedList[index];
            if (!lexedItem) continue;

            for (const token of lexedItem.getTokens()) {
                if (token.type === "NAMED") {
                    if (this.IDS_IN_SEASON.has(token.value)) {
                        throw new Error(ERROR.DUPLICATE_NAMED(token.value));
                    }
                    this.IDS_IN_SEASON.add(token.value);
                }

                if (token.type === "LINK") {
                    this.IDS_IN_LINK.add(token.value);
                }
            }
        }

        for (const id of this.IDS_IN_LINK) {
            if (!this.IDS_IN_SEASON.has(id)) {
                throw new Error(ERROR.LINKED_NAME_NOT_FOUND(id));
            }
        }
    }
}