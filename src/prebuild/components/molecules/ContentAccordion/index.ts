import "./styles.css";
import type { OnoperComponentProps } from "../../../component/types";
import { AccordionToggleIcon } from "../../atoms/AccordionToggleIcon";
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ContentAccordionProps extends OnoperComponentProps {
    icon?: TemplateResult;
    title: string;
    list: string[];
}

@customElement('content-accordion')
export class ContentAccordionComponent extends LitElement {

    @property({ attribute: false })
    props: ContentAccordionProps | undefined;

    override render() {
        if (!this.props) return;

        const { icon, title, list, className } = this.props;

        const iconElement = html`
            <span class="accordion-icon">${icon}</span>
        `;

        const listItemElement = (item: string) => html`
            <li>${item}</li>
        `;

        return html`
            <div
                class="onoper-content-accordion ${className || ''}"
                data-active="${list.length > 0}"
            >
                <div class="onoper-content-accordion-header">
                    ${icon ? iconElement : ''}
                    <h3>${title}</h3>
                    <span class="accordion-toggle">
                        ${AccordionToggleIcon({})}
                    </span>
                </div>
                <div class="onoper-content-accordion-body">
                    <ul>
                        ${list.map(item => listItemElement(item))}
                    </ul>
                </div>
            </div>
        `;
    }
}

export function ContentAccordion(props: ContentAccordionProps) {
    const element = new ContentAccordionComponent();
    element.props = props;
    return element.render();
}
