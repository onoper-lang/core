import "./styles.css";
import { generateColorFromId } from "../../../utils";
import { GroupCardFooter } from "../../molecules/GroupCardFooter";
import type { SimpleCardProps } from "../SimpleCard";
import { html, type TemplateResult } from 'lit';

interface GroupCardProps extends SimpleCardProps {
    children: TemplateResult;
}

export function GroupCard(props: GroupCardProps) {
    const { named, title, links, claims, comments, className, children, uid } = props;
        
    return html`
        <div
            id="id_${uid}"
            class="onoper-group-card ${className || ''}"
        >
            <div
                class="onoper-group-card-header"
                ${named ? `data-named` : ''}
            >
                ${named ? 
                    html`<span
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