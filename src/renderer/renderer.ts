import type { OnoperIntermediaryDTO } from "../models/intermediary";
import { GroupCard } from "./components/organisms/GroupCard";
import { Root } from "./components/organisms/Root";
import { SimpleCard } from "./components/organisms/SimpleCard";
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
        const resolvedStyle = resolveStyle();
        const resolvedHTML = this.recursiveRender(item);
        
        if (!resolvedHTML) {
            throw new Error("Invalid item type or structure");
        }

        let resolvedConnections = "";

        for (const key in this.elementList) {
            const elementList = this.elementList[key];
            if (!elementList || elementList.length === 0) continue;

            for (let i = 0; i < elementList.length; i++) {
                if (i + 1 >= elementList.length) break;
                const elementId = elementList[i];
                const nextElementId = elementList[i + 1];
                resolvedConnections += `arrowLine('#id_${elementId}', '#id_${nextElementId}');\n`;
            }
        }

        const html = `
            <script src="https://cdn.jsdelivr.net/npm/arrow-line/dist/arrow-line.min.js"></script>
            ${resolvedStyle}
            ${resolvedHTML}
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    ${resolvedConnections}
                });
            </script>
        `.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
        return html;
    }
}