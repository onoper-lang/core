import { scriptTable } from "../logic";
import nodeParser from "node-html-parser";
import type { OnoperRenderedComponent, OnoperComponentToRender } from "./types";
import { styleTable } from "../style";

const eventList = [
    "onclick"
]

export class OnoperComponent<T> {
    constructor(
        private element: OnoperComponentToRender<T>,
    ) {}

    private registerLogic() {
        const { logic, template, props } = this.element;
        const element = template(props);

        const node = nodeParser.parse(element.trim());

        eventList.forEach((eventName) => {
            const eventElements = node.querySelectorAll(`[${eventName}]`);

            eventElements.forEach((el) => {
                const eventAttr = el.getAttribute(eventName);
                if (!eventAttr) return;

                for (const key in logic) {
                    const findKeyRegex = new RegExp(`${key}( |\t){0,}\\(`);
                    if (findKeyRegex.test(eventAttr)) {
                        const mapName = `onoper_${template.name}_${key}`;
                        const fnString = logic[key]?.toString().replace(findKeyRegex, `${mapName}(`);
                        const attrName = eventAttr.replace(findKeyRegex, `${mapName}(`);
                        if (!fnString) continue;
                        
                        scriptTable.set(mapName, fnString);
                        el.setAttribute(eventName, attrName);
                    }
                }
            });
        });


        return node.toString();
    }

    private registerStyle() {
        const { style, template } = this.element;

        if (!style) return;

        const styleName = `onoper_${template.name}_style`;
        if (styleTable.has(styleName)) return;

        styleTable.set(styleName, style);
    }

    public render(): OnoperRenderedComponent {
        this.registerStyle();
        const withLogic = this.registerLogic();

        return withLogic;
    }
}