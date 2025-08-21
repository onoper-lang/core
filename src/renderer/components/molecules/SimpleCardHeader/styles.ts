import { BACKGROUND_ALT_COLOR, INTERN_ROUNDED, MIDDLE_ROUNDED } from "../../../core/style/consts";

export const style = `
    .onoper-simple-card-header {
        display: flex;
        width: max-content;
        align-items: center;
        gap: 12px;
        padding: 4px 8px;
        background-color: ${BACKGROUND_ALT_COLOR};
        ${MIDDLE_ROUNDED}
    }
    .onoper-simple-card-header[data-named] {
        padding-left: 4px;
    } 
    .onoper-simple-card-header-named {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        ${INTERN_ROUNDED}
    }
`
