import type { OnoperComponentProps } from "../../../component/types";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface AccordionToggleIconProps extends OnoperComponentProps {
    size?: number;
}

@customElement('accordion-toggle-icon')
export class AccordionToggleIconComponent extends LitElement {

    @property({ attribute: false })
    props: AccordionToggleIconProps | undefined;

    override render() {
        if (!this.props) return;

        const { size = 18 } = this.props;

        return html`
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46967 6.96973C2.76256 6.67684 3.23743 6.67684 3.53033 6.96973L12 15.4393L20.4697 6.96973C20.7626 6.67684 21.2374 6.67684 21.5303 6.96973C21.8232 7.26263 21.8232 7.7375 21.5303 8.03039L12.5303 17.0303C12.2374 17.3232 11.7626 17.3232 11.4697 17.0303L2.46967 8.03039C2.17678 7.7375 2.17678 7.26263 2.46967 6.96973Z" fill="#5F5F5F"/>
            </svg>
        `
    }
}

export function AccordionToggleIcon(props: AccordionToggleIconProps) {
    const element = new AccordionToggleIconComponent();
    element.props = props;
    return element.render();
}