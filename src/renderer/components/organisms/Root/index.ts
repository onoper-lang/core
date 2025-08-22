import type { OnoperComponentProps } from "../../../core/component/types";
import { OnoperComponent } from "../../../core/component";
import { style } from "./styles";

interface RootProps extends OnoperComponentProps {
    season: string;
    children: string;
}

export function RootTemplate(props: RootProps) {
    const { children, season } = props;
    return `
        <div class='onoper-root_${season}'>
            <div class='onoper-viewport_${season}'>
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
        style: style(props.season),
    }).render()
}