import type { OnoperIntermediaryDTO } from "../models/intermediary";

function TaskComponent(item: OnoperIntermediaryDTO, children?: string): string {
    const hasComment = true;
    const hasClaim = true;
    const hasChildren = children ? true : false;

    return (`
        <article
            class='onoper-task'
            data-has-children='${hasChildren}'
            data-id='${item.namedID}'
        >
            <header>
                <div class='onoper-badge-container'>
                    <button
                        class='onoper-badge'
                        data-has-comment='${hasComment}'
                        data-has-claim='${hasClaim}'
                    >
                        <span class='onoper-badge-icon'>💬</span>
                        
                        <div class='onoper-messages-container'>
                            ${item.claims.map(claim => (
                                `<div class='onoper-claim'>
                                    <span class='onoper-claim-icon'>🗨️</span>
                                    <span class='onoper-claim-content'>${claim}</span>
                                </div>`
                            )).join("")}
                            ${item.comments.map(comment => (
                                `<div class='onoper-comment'>
                                    <span class='onoper-comment-icon'>💬</span>
                                    <span class='onoper-comment-content'>${comment}</span>
                                </div>`
                            )).join("")}
                        </div>
                    </button>
                </div>
                <p>${item.content}</p>
                <div class='onoper-linked'>
                    ${item.links.map(link => (
                        `<span
                            class='onoper-link'
                            data-linked-id='${link}'
                        ></span>`
                    )).join("")}
                </div>
            </header>

            ${hasChildren ? (`
            <main class='onoper-children'>
                ${children}
            </main>
            `) : ""}
        </article>
    `);
}

function RootComponent(children: string): string {
    return (`
        <div class='onoper-root'>
            <main class='onoper-children'>
                ${children}
            </main>
        </div>
    `);
}

export class OnoperRenderer {
    private recursiveRender(item: OnoperIntermediaryDTO): string | null {
        if (item.type === "TASK") {
            const children = item.children.map(child => this.recursiveRender(child)).join("");
            return TaskComponent(item, children);
        } else if (item.type === "ROOT") {
            const children = item.children.map(child => this.recursiveRender(child)).join("");
            return RootComponent(children);
        }

        return null;
    }

    render(item: OnoperIntermediaryDTO): string {
        const html = this.recursiveRender(item)?.replace(/\n\s*/g, "");
        if (html) {
            return html;
        } else {
            return `<div class='onoper-unknown'>Unknown item type</div>`;
        }
    }
}