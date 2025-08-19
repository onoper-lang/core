import { BACKGROUND_ALT_COLOR, INTERN_ROUNDED, MIDDLE_ROUNDED } from "../../core/constStyle";
import type { OnoperGenericComponentProps } from "../../core/props";
import { generateColorFromId } from "../../core/utils";

export const SimpleCardHeaderStyle = `
    .onoper-simple-card-header {
        display: flex;
        width: max-content;
        align-items: center;
        gap: 12px;
        padding: 4px 8px;
        background-color: ${BACKGROUND_ALT_COLOR};
        ${MIDDLE_ROUNDED}
    }
    .onoper-simple-card-header[data-named] {
        padding-left: 4px;
    } 
    .onoper-simple-card-header-named {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        ${INTERN_ROUNDED}
    }
`

interface SimpleCardHeaderProps extends OnoperGenericComponentProps {
    title: string;
    named?: string;
}

export function SimpleCardHeader(props: SimpleCardHeaderProps): string {
    const { title, named, className } = props;

    return `
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