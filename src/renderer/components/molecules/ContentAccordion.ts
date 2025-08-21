import { BACKGROUND_ALT_COLOR, MIDDLE_ROUNDED } from "../../core/style/consts";
import type { OnoperComponentProps } from "../../core/component/types";
import { AccordionToggleIcon } from "../atoms/AccordionToggleIcon";

export const ContentAccordionStyle = `
    .onoper-content-accordion {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .onoper-content-accordion-header {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 4px 6px;
        background-color: ${BACKGROUND_ALT_COLOR};
        ${MIDDLE_ROUNDED}
    }
    .onoper-content-accordion-header .accordion-toggle {
       display: none;
    }
    .onoper-content-accordion-body {
        padding-left: 32px;
    }
        
    .onoper-content-accordion[data-active="true"] .onoper-content-accordion-body {
        display: flex;
    }
    .onoper-content-accordion[data-active="false"] .onoper-content-accordion-body {
        display: none;
    }
`

interface ContentAccordionProps extends OnoperComponentProps {
    icon?: string;
    title: string;
    list: string[];
}

export function ContentAccordion(props: ContentAccordionProps): string {
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
                    ${AccordionToggleIcon()}
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