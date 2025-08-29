import type { OnoperIntermediaryDTO } from "../intermediary/type";
import { ComponentRegistry } from "../prebuild/entry";
import { DEP_LOGIC, DEP_STYLE } from "./bundle";
import { collectResultSync } from "@lit-labs/ssr/lib/render-result";
import type { TemplateResult } from "lit-html";
import { render } from "@lit-labs/ssr";

export class OnoperRenderer {
    private recursiveRender(item: OnoperIntermediaryDTO): TemplateResult | null {
        const children = item.children.map(child => this.recursiveRender(child));

        if (item.type === "TASK") {
            if (children.length > 0) {
                return ComponentRegistry.GroupCard({
                    uid: item.UID,
                    title: item.content,
                    named: item.namedID,
                    links: item.links,
                    claims: item.claims,
                    comments: item.comments,
                    children
                });
            }
            
            return ComponentRegistry.SimpleCard({
                uid: item.UID,
                title: item.content,
                named: item.namedID,
                links: item.links,
                claims: item.claims,
                comments: item.comments
            });

        } else if (item.type === "ROOT") {
            return ComponentRegistry.Root({ children })
        }

        return null;
    }

    render(item: OnoperIntermediaryDTO): string {
        const rendered = render(this.recursiveRender(item));
        const resolvedHTML = collectResultSync(rendered);

        if (!resolvedHTML) {
            throw new Error("Invalid item type or structure");
        }

        const html = `
            <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>${DEP_STYLE}</style>
                </head>
                <body style="width: 100vw; height: 100vh; margin: 0; padding: 0; overflow: hidden;">
                    ${resolvedHTML}
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