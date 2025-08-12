import { OnoperIntermediaryEntity, type OnoperIntermediaryDTO } from "../models/intermediary";
import type { OnoperLexerToken } from "../models/tokens";

interface HistoryEntity {
    ident: number;
    item: OnoperIntermediaryEntity;
}

export class OnoperIntermediary {
    execute(items: OnoperLexerToken[]): OnoperIntermediaryDTO {
        const root = new OnoperIntermediaryEntity({
            type: "ROOT",
            content: "Root"
        });

        const history: HistoryEntity[] = [{ident: -1, item: root}];

        for (const item of items) {
            for (const token of item.getTokens()) {
                let lastItemInHistory = history[history.length - 1];
                if (!lastItemInHistory) continue;
                
                if (token.type === "TASK") {
                    const newItem = new OnoperIntermediaryEntity({
                        type: "TASK",
                        content: token.value
                    });
                    while (lastItemInHistory) {
                        if (lastItemInHistory.ident < item.position.ident) {
                            break;
                        }
                        history.pop();
                        lastItemInHistory = history[history.length - 1];
                    }
                    if (!lastItemInHistory) continue;

                    lastItemInHistory.item.addChild(newItem);

                    history.push({
                        ident: item.position.ident,
                        item: newItem
                    });
                }
                
                if (token.type === "NAMED") {
                    lastItemInHistory.item.namedID = token.value
                }
                if (token.type === "LINK") {
                    lastItemInHistory.item.addLink(token.value);
                }
                if (token.type === "CLAIM") {
                    lastItemInHistory.item.addClaim(token.value);
                }
                if (token.type === "COMMENT") {
                    lastItemInHistory.item.addComment(token.value);
                }
            }
        }

        return root.toDTO()
    }
}