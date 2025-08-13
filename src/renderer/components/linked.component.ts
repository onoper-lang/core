import { generateColorFromId } from "../utils";

export const LINKED_STYLE = `
    .onoper-linked {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
`;

export const LINK_ROW_STYLE = `
    .onoper-link {
        width: 0.75rem;
        height: 100%;
        border-radius: 4px;
        --linked-id-color: #FFDD57;
        background-color: var(--linked-id-color);
    }
`;

function LinkRowComponent(link: string): string {
    return (`
        <span
            class='onoper-link'
            style='--linked-id-color: ${generateColorFromId(link)}'
        ></span>
    `);
}

export function LinkedComponent(links: string[]): string {
    return (`
        <div class='onoper-linked'>
            ${links.map(link => LinkRowComponent(link)).join('')}
        </div>
    `);
}