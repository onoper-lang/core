import type { OnoperIntermediaryDTO } from "../models/intermediary";
import { GroupCard } from "./components/organisms/GroupCard";
import { Root } from "./components/organisms/Root";
import { handleSelectClick, SimpleCard } from "./components/organisms/SimpleCard";
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

        let resolvedCreateConnections = "";
        let resolvedDeleteConnections = "";

        for (const key in this.elementList) {
            const elementList = this.elementList[key];
            if (!elementList || elementList.length === 0) continue;

            for (let i = 0; i < elementList.length; i++) {
                if (i + 1 >= elementList.length) break;
                const elementId = elementList[i];
                const nextElementId = elementList[i + 1];
                resolvedCreateConnections += `arrows["arrow_${elementId}_${nextElementId}"] = arrowLine('#id_${elementId}', '#id_${nextElementId}');\n`;
                resolvedDeleteConnections += `if (arrows["arrow_${elementId}_${nextElementId}"]) arrows["arrow_${elementId}_${nextElementId}"].remove();\n`;
            }
        }

        const html = `
            <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/arrow-line/dist/arrow-line.min.js"></script>
            ${resolvedStyle}
            ${resolvedHTML}
            <script>
                const arrows = {};
                
                function updateArrows() {
                    ${resolvedDeleteConnections}
                    ${resolvedCreateConnections}
                    requestAnimationFrame(updateArrows);
                }

                requestAnimationFrame(updateArrows);
                
                ${handleSelectClick.toString()};

                let x = 0;
                let y = 0;

                function handleDrag(element) {
                    interact(element)
                    .draggable({
                        modifiers: [
                            interact.modifiers.snap({
                                targets: [
                                    interact.snappers.grid({ x: 1, y: 1 })
                                ],
                                range: Infinity,
                                relativePoints: [ { x: 0, y: 0 } ]
                            }),
                        ],
                        inertia: true
                    })
                    .on('dragmove', function (event) {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        target.style.transform = \`translate(\${x}px, \${y}px)\`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    })
                }

                setTimeout(() => {
                    const svg = document.querySelector('#__arrowLineInternal-svg-canvas');
                    const viewport = document.querySelector('#onoper-viewport');
                    if (svg && viewport && !viewport.contains(svg)) {
                        viewport.appendChild(svg);
                    }
                    handleDrag(viewport);
                }, 100);
            </script>
        `.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
        return html;
    }
}