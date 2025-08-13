import type { OnoperIntermediaryDTO } from "../../models/intermediary";
import { generateColorFromId } from "../utils";
import { TaskHeaderComponent } from "./taskHeader.component";

export const TASK_STYLE = `
    .onoper-task {
        border: 1px solid #ccc;
        border-radius: 1rem;
        padding: 1rem;
        background-color: #FAFAFA;
        position: relative;
        overflow: hidden;
        min-width: 12rem;

        --named-id-color: #EEF3FF;
    }

    .onoper-task::before {
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to bottom left, var(--named-id-color), #FAFAFA);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.4;
        z-index: 0;
        pointer-events: none;
    }
`

export function TaskComponent(item: OnoperIntermediaryDTO, children?: string): string {
    const hasChildren = children ? true : false;

    return (`
        <article
            class='onoper-task'
            data-has-children='${hasChildren}'
            style='--named-id-color: ${generateColorFromId(item.namedID)}'
        >
            ${TaskHeaderComponent(item)}

            ${hasChildren ? (`
                <main class='onoper-children'>
                    ${children}
                </main>
            `) : (
                ""
            )}
        </article>
    `);
}