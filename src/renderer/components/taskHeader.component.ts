import type { OnoperIntermediaryDTO } from "../../models/intermediary";
import { MessagesComponent } from "./messages.component";
import { LinkedComponent } from "./linked.component";

export const TASK_HEADER_STYLE = `
    .onoper-task-header {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1.5rem 1fr auto;
        gap: 1rem;
    }

    .onoper-badge-container {
        display: flex;
    }

    .onoper-badge {
        width: min-content;
        height: min-content;
        border-radius: 999px;
        border: none;
        background-color: #E0E0E0;
        cursor: pointer;
    }
    
    .onoper-badge-icon {
        width: 1.25rem;
        height: 1.25rem;
        aspect-ratio: 1 / 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .onoper-badge-icon::after {
        content: '';
        display: block;
    }

    .onoper-badge[data-has-comment='true'] .onoper-badge-icon::after {
        content: '💬';
    }

    .onoper-badge[data-has-comment='true'] .onoper-badge-icon {
        background-color: #FFE1A8;
    }

    .onoper-badge[data-has-claim='true'] .onoper-badge-icon::after {
        content: '❗';
    }

    .onoper-badge[data-has-claim='true'] .onoper-badge-icon {
        background-color: #FFB1B1;
    }

    .onoper-badge[data-has-claim='false'][data-has-comment='false'] {
        background-color: transparent;
    }
`

export function TaskHeaderComponent(item: OnoperIntermediaryDTO): string {
    const hasComment = item.comments.length > 0;
    const hasClaim = item.claims.length > 0;

    return (`
        <header class='onoper-task-header'>
            <div class='onoper-badge-container'>
                <button
                    class='onoper-badge'
                    data-has-comment='${hasComment}'
                    data-has-claim='${hasClaim}'
                >
                    <span class='onoper-badge-icon'></span>
                    ${MessagesComponent(item.claims, item.comments)}
                </button>
            </div>

            <p>${item.content}</p>

            ${LinkedComponent(item.links)}
        </header>
    `);
}