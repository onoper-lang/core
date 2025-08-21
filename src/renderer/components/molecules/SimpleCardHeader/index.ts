import { OnoperComponent } from "../../../core/component";
import type { OnoperComponentProps } from "../../../core/component/types";
import { generateColorFromId } from "../../../core/utils";
import { style } from "./styles";

interface SimpleCardHeaderProps extends OnoperComponentProps {
    title: string;
    named?: string;
}

export function SimpleCardHeaderTemplate(props: SimpleCardHeaderProps): string {
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

export function SimpleCardHeader(props: SimpleCardHeaderProps): string {
    const template = SimpleCardHeaderTemplate;

    return new OnoperComponent({
        logic: {},
        template,
        props,
        style
    }).render();
}