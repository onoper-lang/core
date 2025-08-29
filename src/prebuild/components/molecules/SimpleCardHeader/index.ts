import "./styles.css";
import type { OnoperComponentProps } from "../../../component/types";
import { generateColorFromId } from "../../../utils";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface SimpleCardHeaderProps extends OnoperComponentProps {
    title: string;
    named?: string;
}

@customElement('simple-card-header')
export class SimpleCardHeaderComponent extends LitElement {

    @property({ attribute: false })
    props: SimpleCardHeaderProps | undefined;

    override render() {
        if (!this.props) return;

        const { title, named, className } = this.props;

        return html`
            <div
                class="onoper-simple-card-header ${className || ''}"
                ${named ? `data-named` : ''}
            >
                ${named ? 
                    `<span
                        class="onoper-simple-card-header-named"
                        aria-label="${named}"
                        style="background-color: ${generateColorFromId(named)};"
                    ></span>` : ''
                }
                <h3 class="onoper-simple-card-title">${title}</h3>
            </div>
        `;
    }
}

export function SimpleCardHeader(props: SimpleCardHeaderProps) {
    const element = new SimpleCardHeaderComponent();
    element.props = props;
    return element.render();
}