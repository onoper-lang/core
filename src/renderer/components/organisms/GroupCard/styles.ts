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
        min-width: 50vw;
        max-width: 80vw;
        ${OVER_ROUNDED}
        overflow: hidden;
    }
    .onoper-group-card-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        padding-top: 12px;
        padding-bottom: 36px;
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
        justify-content: center;
        align-items: center;
        padding: 0px 12px;
        padding-bottom: 36px;
    }
    .onoper-group-card-footer-container {
        padding: 0px 12px;
        padding-bottom: 12px;
    }
`;