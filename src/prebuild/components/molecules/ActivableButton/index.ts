import "./styles.css";
import { OnoperComponent } from "../../../component";
import type { OnoperComponentProps } from "../../../component/types";
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ActivableButtonProps extends OnoperComponentProps {
    label: string;
    activable: boolean;
    children?: TemplateResult;
    style?: string;
}

@customElement('activable-button')
export class ActivableButtonComponent extends LitElement {

    @property({ attribute: false })
    props: ActivableButtonProps | undefined;

    override render() {
        if (!this.props) return;

         const { label, activable, children, className, style } = this.props;

        return html`
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
}

export function ActivableButton(props: ActivableButtonProps) {
    const element = new ActivableButtonComponent();
    element.props = props;
    return element.render();
}
