export const MESSAGES_STYLE = `
    .onoper-messages-container {
    }
`;

export const CLAIM_ROW_STYLE = `
    onoper-claim {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const COMMENT_ROW_STYLE = `
    .onoper-comment {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

function ClaimRowComponent(claim: string): string {
    return (`
        <div class='onoper-claim'>
            <span class='onoper-claim-icon'>🗨️</span>
            <span class='onoper-claim-content'>${claim}</span>
        </div>
    `)
}

function CommentRowComponent(comment: string): string {
    return (`
        <div class='onoper-comment'>
            <span class='onoper-comment-icon'>💬</span>
            <span class='onoper-comment-content'>${comment}</span>
        </div>
    `);
}

export function MessagesComponent(claims: string[], comments: string[]): string {
    return (`
        <div class='onoper-messages-container'>
            ${claims.map(claim => ClaimRowComponent(claim))}
            ${comments.map(comment => CommentRowComponent(comment))}
        </div>
    `);
}