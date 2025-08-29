import type { OnoperComponentProps } from "../../../component/types";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ClaimIconProps extends OnoperComponentProps {
    size?: number;
}

@customElement('claim-icon')
export class ClaimIconComponent extends LitElement {

    @property({ attribute: false })
    props: ClaimIconProps | undefined;

    override render() {
        if (!this.props) return;

        const { size = 18 } = this.props;

        return html`
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.75C12.4142 15.75 12.75 16.0858 12.75 16.5V17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25V16.5C11.25 16.0858 11.5858 15.75 12 15.75Z" fill="black"/>
                <path d="M12 6C11.5432 6 11.1272 6.26613 10.9632 6.69244C10.7515 7.24287 10.5 7.99726 10.5 8.475C10.5 10.2317 10.8779 12.4041 11.0972 13.517C11.182 13.9475 11.5613 14.25 12 14.25C12.4387 14.25 12.818 13.9475 12.9028 13.517C13.1221 12.4041 13.5 10.2317 13.5 8.475C13.5 7.99726 13.2485 7.24287 13.0368 6.69243C12.8728 6.26613 12.4568 6 12 6Z" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM3.75 12C3.75 7.44365 7.44365 3.75 12 3.75C16.5563 3.75 20.25 7.44365 20.25 12C20.25 16.5563 16.5563 20.25 12 20.25C7.44365 20.25 3.75 16.5563 3.75 12Z" fill="black"/>
            </svg>
        `
    }
}

export function ClaimIcon(props: ClaimIconProps) {
    const element = new ClaimIconComponent();
    element.props = props;
    return element.render();
}