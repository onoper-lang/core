import { ROOT_BACKGROUND_COLOR } from "../../../core/style/consts";

export const style = `
    .onoper-root {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    #onoper-viewport {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 42px;
        padding: 24px;
        background-color: ${ROOT_BACKGROUND_COLOR};
        min-height: 100vh;
    }
`