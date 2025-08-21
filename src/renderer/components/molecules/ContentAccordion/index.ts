import { OnoperComponent } from "../../../core/component";
import type { OnoperComponentProps } from "../../../core/component/types";
import { AccordionToggleIcon } from "../../atoms/AccordionToggleIcon";
import { style } from "./styles";

interface ContentAccordionProps extends OnoperComponentProps {
    icon?: string;
    title: string;
    list: string[];
}

export function ContentAccordionTemplate(props: ContentAccordionProps): string {
    const { icon, title, list, className } = props;

    return `
        <div
            class="onoper-content-accordion ${className || ''}"
            data-active="${list.length > 0}"
        >
            <div class="onoper-content-accordion-header">
            ${icon ? `<span class="accordion-icon">${icon}</span>` : ''}
                <h3>${title}</h3>
                <span class="accordion-toggle">
                    ${AccordionToggleIcon({})}
                </span>
            </div>
            <div class="onoper-content-accordion-body">
                <ul>
                    ${list.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

export function ContentAccordion(props: ContentAccordionProps): string {
    const template = ContentAccordionTemplate;

    return new OnoperComponent({
        props,
        style,
        logic: {},
        template,
    }).render();
}