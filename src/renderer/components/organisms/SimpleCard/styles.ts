import { ACTIVE_COLOR, BACKGROUND_ALT_COLOR, BACKGROUND_COLOR, BOX_SHADOW, EXTERN_ROUNDED } from "../../../core/style/consts";

export const style = `
    .onoper-simple-card {
        background-color: ${BACKGROUND_COLOR};
        border: 1px solid ${BACKGROUND_ALT_COLOR};
        ${BOX_SHADOW}
        display: flex;
        flex-direction: column;
        padding: 12px;
        gap: 12px;
        min-width: 180px;
        width: max-content;
        max-width: 280px;
        ${EXTERN_ROUNDED}
    }

    .onoper-simple-card-main {
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: all 0.3s ease-in-out;
        max-height: 9999px;
    }
    .onoper-simple-card-main[data-has-content="false"] {
        display: none;
    }

    .onoper-simple-card-footer-container {
        transition: all 0.3s;
        max-height: 9999px;
        opacity: 1;
    }
    .onoper-simple-card-footer-container[data-has-content="false"] {
        display: none;
    }

    .onoper-simple-card[data-active="true"] .onoper-simple-card-footer-container,
    .onoper-simple-card:hover .onoper-simple-card-footer-container {
        opacity: 0;
        max-height: 0px;
    }
    .onoper-simple-card[data-active="true"] .onoper-simple-card-header h3,
    .onoper-simple-card:hover .onoper-simple-card-header h3 {
        -webkit-line-clamp: 5;
                line-clamp: 5;
    }

    .onoper-simple-card[data-active="false"] .onoper-simple-card-main {
        opacity: 0;
        max-height: 0px;
    }

    .onoper-simple-card[data-active="true"] {
        border: 1px solid ${ACTIVE_COLOR};
    }

    .onoper-simple-card:hover .onoper-simple-card-main {
        position: relative;
        opacity: 1;
        max-height: 9999px;
    }
`