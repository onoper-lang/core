import type { OnoperIntermediaryDTO } from "../models/intermediary";
import { GroupCard } from "./components/organisms/GroupCard";
import { Root } from "./components/organisms/Root";
import { SimpleCard } from "./components/organisms/SimpleCard";
import { resolveArrowConnections, resolveGroupDeepDirection, resolveInteractJS, resolveLogic, scriptTable } from "./core/logic";
import { resolveStyle, styleTable } from "./core/style";
import { v7 as uuid } from "uuid";

export class OnoperRenderer {
    elementList: string[][] = [];
    currentNumber: number = -1;
    season: string = uuid();

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
            return Root({ children, season: this.season });
        }

        return null;
    }

    render(item: OnoperIntermediaryDTO): string {
        styleTable.clear();
        scriptTable.clear();

        const resolvedHTML = this.recursiveRender(item);
        
        if (!resolvedHTML) {
            throw new Error("Invalid item type or structure");
        }

        const resolvedArrowConnection = resolveArrowConnections(
            this.elementList, this.season
        );
        const resolvedInteractJS = resolveInteractJS(this.season);
        const resolvedStyle = resolveStyle(this.season);
        const resolvedLogic = resolveLogic();
        const resolvedGroupDeepDirection = resolveGroupDeepDirection(this.season)

        const html = `
            <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    ${resolvedStyle}
                    ${resolvedArrowConnection}
                    ${resolvedInteractJS}
                    ${resolvedGroupDeepDirection}
                </head>
                <body style="width: 100vw; height: 100vh; margin: 0; padding: 0; overflow: hidden;">
                    ${resolvedHTML}
                    ${resolvedLogic}
                </body>
            </html>
        `.replace(/\n/g, '').replace(/\s+/g, ' ').trim();

        const encodedHtml = btoa(unescape(encodeURIComponent(html)));

        return `
            <iframe 
            src="data:text/html;base64,${encodedHtml}"
            style="width: 100%; height: 100%; border: none;"
            sandbox="allow-scripts allow-same-origin"
            ></iframe>
        `;
    }
}