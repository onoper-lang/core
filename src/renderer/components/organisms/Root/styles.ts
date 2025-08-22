import { ROOT_BACKGROUND_COLOR } from "../../../core/style/consts";

export const style = (season: string) => `
    .onoper-root_${season} {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .onoper-viewport_${season} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 42px;
        padding: 24px;
        background-color: ${ROOT_BACKGROUND_COLOR};
        height: min-content;
        width: min-content;
        margin: auto;
    }
`