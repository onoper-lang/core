import type { OnoperIntermediaryDTO } from "../models/intermediary";
import { GroupCard } from "./components/organisms/GroupCard";
import { Root } from "./components/organisms/Root";
import { SimpleCard } from "./components/organisms/SimpleCard";
import { resolveArrowConnections, resolveInteractJS, resolveLogic } from "./core/logic";
import { resolveStyle } from "./core/style";

export class OnoperRenderer {
    elementList: string[][] = [];
    currentNumber: number = -1;

    private recursiveRender(item: OnoperIntermediaryDTO): string | null {
        this.currentNumber++;
        this.elementList.push([]);

        this.elementList[this.currentNumber]?.push(...item.children.map(child => child.UID));
        const children = item.children.map(child => this.recursiveRender(child)).join("");

        if (item.type === "TASK") {
            if (children) {
                return GroupCard({
                    uid: item.UID,
                    title: item.content,
                    named: item.namedID,
                    links: item.links,
                    claims: item.claims,
                    comments: item.comments,
                    children
                });
            }

            return SimpleCard({
                uid: item.UID,
                title: item.content,
                named: item.namedID,
                links: item.links,
                claims: item.claims,
                comments: item.comments
            });

        } else if (item.type === "ROOT") {
            return Root({ children });
        }

        return null;
    }

    render(item: OnoperIntermediaryDTO): string {
        const resolvedHTML = this.recursiveRender(item);
        
        if (!resolvedHTML) {
            throw new Error("Invalid item type or structure");
        }

        const resolvedArrowConnection = resolveArrowConnections(this.elementList);
        const resolvedInteractJS = resolveInteractJS();
        const resolvedStyle = resolveStyle();
        const resolvedLogic = resolveLogic();

        const html = `
            ${resolvedStyle}
            ${resolvedLogic}
            ${resolvedHTML}
            ${resolvedArrowConnection}
            ${resolvedInteractJS}
        `.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
        return html;
    }
}