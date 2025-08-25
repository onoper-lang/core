import { OnoperComponent } from "../../../core/component";
import { generateColorFromId } from "../../../core/utils";
import { GroupCardFooter } from "../../molecules/GroupCardFooter";
import type { SimpleCardProps } from "../SimpleCard";
import { style } from "./styles";

interface GroupCardProps extends SimpleCardProps {
    children: string;
}

export function GroupCardTemplate(props: GroupCardProps) {
    const { named, title, links, claims, comments, className, children } = props;
    
    return `
        <div
            id="id_${props.uid}"
            class="onoper-group-card ${className || ''}"
        >
            <div
                class="onoper-group-card-header"
                ${named ? `data-named` : ''}
            >
                ${named ? 
                    `<span
                        class="onoper-group-card-header-named"
                        aria-label="${named}"
                        style="background-color: ${generateColorFromId(named)};"
                    ></span>` : ''
                }
                <h2 class="onoper-group-card-title">${title}</h2>
            </div>
            <div class="onoper-group-card-children">
                ${children}
            </div>
            <div
                class="onoper-group-card-footer-container"
                data-has-content="${links.length > 0 || claims.length > 0 || comments.length > 0}"
            >
                ${GroupCardFooter({ links, claims, comments })}
            </div>
        </div>
    `;
}

export function GroupCard(props: GroupCardProps): string {
    const template = GroupCardTemplate;

    return new OnoperComponent({
        logic: {},
        template,
        props,
        style
    }).render()
}