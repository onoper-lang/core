import { CLAIM_COLOR, COMMENT_COLOR, MIDDLE_ROUNDED } from "../../../core/style/consts";

export const style = `
    .onoper-group-card-footer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: start;
        gap: 8px;
    }

    .onoper-group-card-footer .onoper-content-accordion-header {
        max-width: max-content;
    }
    .onoper-group-footer-links {
        display: flex;
        align-items: center;
        gap: -3px;
    }
    .onoper-group-footer-link {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        ${MIDDLE_ROUNDED}
    }
`