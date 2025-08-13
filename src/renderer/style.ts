import { CLAIM_ROW_STYLE, COMMENT_ROW_STYLE, MESSAGES_STYLE } from "./components/messages.component";
import { LINKED_STYLE, LINK_ROW_STYLE } from "./components/linked.component";
import { ROOT_STYLE } from "./components/root.component";
import { TASK_STYLE } from "./components/task.component";
import { TASK_HEADER_STYLE } from "./components/taskHeader.component";

export function resolveStyle(): string {
    return `
        <style>
            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
            }
                
            ${ROOT_STYLE}
            ${TASK_STYLE}
            ${TASK_HEADER_STYLE}

            ${MESSAGES_STYLE}
            ${CLAIM_ROW_STYLE}
            ${COMMENT_ROW_STYLE}

            ${LINKED_STYLE}
            ${LINK_ROW_STYLE}
        </style>
    `;
}