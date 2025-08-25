import { BACKGROUND_ALT_COLOR, BACKGROUND_COLOR, BOX_SHADOW, OVER_ROUNDED } from "../../../core/style/consts";

export const style = `
    .onoper-group-card {
        background-color: ${BACKGROUND_COLOR};
        border: 1px solid ${BACKGROUND_ALT_COLOR};
        ${BOX_SHADOW}
        display: flex;
        flex-direction: column;
        padding: 0px;
        padding-top: 0;
        min-width: min-content;
        width: max-content;
        ${OVER_ROUNDED}
        overflow: hidden;
    }
    .onoper-group-card-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        padding: 12px;
        padding-top: 12px;
        padding-bottom: 36px;
    }
    .onoper-group-card-header h2 {
        width: max-content;
        max-width: 100%;
    }
    .onoper-group-card-header[data-named] {
        padding-top: 0px
    } 
    .onoper-group-card-header-named {
        width: 100%;
        height: 12px;
        flex-shrink: 0;
    }
    .onoper-group-card-children {
        display: flex;
        gap: 42px;
        align-items: center;
        padding: 0px 12px;
        padding-bottom: 12px;
        width: 100%;
        height: 100%;
    }
    .onoper-group-card-children >* {
        margin-left: auto;
        margin-right: auto;
    }
    .onoper-group-card-footer-container {
        padding: 0px 12px;
        padding-top: 24px;
        padding-bottom: 12px;
    }
`;