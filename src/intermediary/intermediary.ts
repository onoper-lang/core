import { OnoperIntermediaryEntity, type OnoperIntermediaryDTO } from "./type";
import type { OnoperLexerToken } from "../lexicalAnalysis/tokenModel";

interface HistoryEntity {
    ident: number;
    item: OnoperIntermediaryEntity;
}

// "NAMED"
// "TASK",
// "LINK",
// "CLAIM",
// "COMMENT"

export class OnoperIntermediary {
    execute(items: OnoperLexerToken[]): OnoperIntermediaryDTO {
        const root = new OnoperIntermediaryEntity({
            type: "ROOT",
            content: "Root"
        });

        const history: HistoryEntity[] = [{ident: -1, item: root}];

        for (const item of items) {
            let currentNamedID: string | undefined;

            while (true) {
                const lastItemInHistory = history[history.length - 1];
                if (!lastItemInHistory) break;
                if (lastItemInHistory.ident < item.position.ident) {
                    break;
                }
                history.pop();
            }
            const lastItemInHistoryAfterPop = history[history.length - 1];
            if (!lastItemInHistoryAfterPop) continue;

            for (const token of item.getTokens()) {
                if (token.type === "CLAIM")
                    lastItemInHistoryAfterPop.item.addClaim(token.value);
                if (token.type === "COMMENT")
                    lastItemInHistoryAfterPop.item.addComment(token.value);
                if (token.type === "LINK")
                    lastItemInHistoryAfterPop.item.addLink(token.value);
                if (token.type === "NAMED")
                    currentNamedID = token.value;
                if (token.type === "TASK") {
                    const newItem = new OnoperIntermediaryEntity({
                        type: "TASK",
                        content: token.value
                    });

                    lastItemInHistoryAfterPop.item.addChild(newItem);
                    
                    history.push({
                        ident: item.position.ident,
                        item: newItem
                    });
                }
            }

            if (currentNamedID) {
                const lastItemInHistoryForNamed = history[history.length - 1];
                if (!lastItemInHistoryForNamed) continue;
                lastItemInHistoryForNamed.item.namedID = currentNamedID;
            }

        }

        return root.toDTO()
    }
}