import { ROOT_BACKGROUND_COLOR } from "../../core/constStyle";
import type { OnoperGenericComponentProps } from "../../core/props";

export const RootStyle = `
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

interface RootProps extends OnoperGenericComponentProps {
    children: string;
}

export function Root(props: RootProps) {
    const { children } = props;
    return `
        <div class='onoper-root'>
            <div id="onoper-viewport">
                ${children}
            </div>
        </div>
    `;
}