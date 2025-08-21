import type { OnoperComponentProps } from "../../../core/component/types";
import { OnoperComponent } from "../../../core/component";
import { style } from "./styles";

interface RootProps extends OnoperComponentProps {
    children: string;
}

export function RootTemplate(props: RootProps) {
    const { children } = props;
    return `
        <div class='onoper-root'>
            <div id="onoper-viewport">
                ${children}
            </div>
        </div>
    `;
}

export function Root(props: RootProps): string {
    const template = RootTemplate;

    return new OnoperComponent({
        logic: {},
        template,
        props,
        style
    }).render()
}