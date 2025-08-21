import { OnoperComponent } from "../../../core/component";
import type { OnoperComponentProps } from "../../../core/component/types";
import { style } from "./styles";

interface ActivableButtonProps extends OnoperComponentProps {
    label: string;
    activable: boolean;
    children: string;
    style?: string;
}

export function ActivableButtonTemplate(props: ActivableButtonProps): string {
    const { label, activable, children, className, style } = props;

    return `
        <button
            class="onoper-activable-button ${className || ''}"
            style="${style || ''}"
            ${activable ? '' : 'disabled'}
            aria-label="${label}"
        >
            ${children}
            <span class="onoper-button-label">${label}</span>
        </button>
    `;
}

export function ActivableButton(props: ActivableButtonProps): string {
    const template = ActivableButtonTemplate;
    
    return new OnoperComponent({
        props,
        style,
        logic: {},
        template,
    }).render();
}