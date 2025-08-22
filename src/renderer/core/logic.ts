import fs from "fs";
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

export function resolveArrowConnections(elementList: string[][], season: string): string {
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

    const arrowLineScript = fs.readFileSync(__dirname + "/scripts/arrow-line.min.js", "utf-8");
    return `
        <script>
            ${arrowLineScript}
        </script>
        <script>
            const arrows = {};

            function updateArrows() {
                try {
                    ${resolvedDeleteConnections}
                    ${resolvedCreateConnections}

                    const viewport = document.querySelector('.onoper-viewport_${season}');
                    if (!viewport) throw new Error("Viewport not found");
                    const x = viewport.getAttribute('data-x') || 0;
                    const y = viewport.getAttribute('data-y') || 0;
    
                    const targetArrows = document.querySelector('#__arrowLineInternal-svg-canvas');
                    if (!targetArrows) throw new Error("Arrows not found");
                    targetArrows.style.transform = \`translate(\${x}px, \${y}px)\`;
                    targetArrows.setAttribute('data-x', x);
                    targetArrows.setAttribute('data-y', y);

                    requestAnimationFrame(updateArrows);
                } catch (e) {
                    console.error(e.message);
                    requestAnimationFrame(updateArrows);
                }
            }

            requestAnimationFrame(updateArrows);
        </script>
    `
}

export function resolveInteractJS(season: string): string {
    const interactJS = fs.readFileSync(__dirname + "/scripts/interact.min.js", "utf-8");
    return `
        <script>
            ${interactJS}
        </script>
        <script>
            function initMount(fn) {
                setTimeout(() => {
                    fn();
                }, 200);
            }   

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
            
            initMount(() => {
                const viewport = document.querySelector('.onoper-viewport_${season}');
                handleDrag(viewport);
            });
        </script>
    `;
}