import { MIDDLE_ROUNDED } from "../../../core/style/consts";

export const style = `
    .onoper-activable-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 2px;
        border: none;
        cursor: pointer;
        ${MIDDLE_ROUNDED}
    }
    .onoper-activable-button:disabled {
        opacity: 0.1;
        cursor: not-allowed;
    }
    .onoper-button-label {
        opacity: 0;
        position: absolute;
        pointer-events: none;
    }
`