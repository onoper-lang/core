import { BACKGROUND_ALT_COLOR, MIDDLE_ROUNDED } from "../../../core/style/consts";

export const style = `
    .onoper-content-accordion {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .onoper-content-accordion-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 4px 6px;
        background-color: ${BACKGROUND_ALT_COLOR};
        ${MIDDLE_ROUNDED}
    }
    .onoper-content-accordion-header .accordion-toggle {
       display: none;
    }
    .onoper-content-accordion-body {
        padding-left: 32px;
    }
        
    .onoper-content-accordion[data-active="true"] .onoper-content-accordion-body {
        display: flex;
    }
    .onoper-content-accordion[data-active="false"] .onoper-content-accordion-body {
        display: none;
    }
`