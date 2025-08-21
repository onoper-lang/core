export const scriptTable = new Map<string, string>();

export function resolveLogic(): string {
    const scriptList: string[] = [];
    scriptTable.forEach((script) => {
        scriptList.push(script);
    });

    return `
        <script>
            ${scriptList.join("\n")}
        </script>
    `;
}

export function resolveArrowConnections(elementList: string[][]): string {
    let resolvedCreateConnections = "";
    let resolvedDeleteConnections = "";

    for (const key in elementList) {
        const elements = elementList[key];
        if (!elements || elements.length === 0) continue;

        for (let i = 0; i < elements.length; i++) {
            if (i + 1 >= elements.length) break;
            
            const elementId = elements[i];
            const nextElementId = elements[i + 1];
            resolvedCreateConnections += `arrows["arrow_${elementId}_${nextElementId}"] = arrowLine('#id_${elementId}', '#id_${nextElementId}');\n`;
            resolvedDeleteConnections += `if (arrows["arrow_${elementId}_${nextElementId}"]) arrows["arrow_${elementId}_${nextElementId}"].remove();\n`;
        }
    }

    return `
        <script src="https://cdn.jsdelivr.net/npm/arrow-line/dist/arrow-line.min.js"></script>
        <script>
            const arrows = {};
            
            function updateArrows() {
                ${resolvedDeleteConnections}
                ${resolvedCreateConnections}
                requestAnimationFrame(updateArrows);
            }

            requestAnimationFrame(updateArrows);
        </script>
    `
}

export function resolveInteractJS(): string {
    return `
        <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script><script src="https://cdn.jsdelivr.net/npm/arrow-line/dist/arrow-line.min.js"></script>
        <script>
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
    `;
}