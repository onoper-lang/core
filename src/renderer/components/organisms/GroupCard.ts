import { BACKGROUND_ALT_COLOR, BACKGROUND_COLOR, BOX_SHADOW, OVER_ROUNDED } from "../../core/constStyle";
import { generateColorFromId } from "../../core/utils";
import { CardFooter } from "../molecules/CardFooter";
import type { SimpleCardProps } from "./SimpleCard";

export const GroupCardStyle = `
    .onoper-group-card {
        background-color: ${BACKGROUND_COLOR};
        border: 1px solid ${BACKGROUND_ALT_COLOR};
        ${BOX_SHADOW}
        display: flex;
        flex-direction: column;
        padding: 0px;
        padding-top: 0;
        min-width: 50vw;
        max-width: 80vw;
        ${OVER_ROUNDED}
        overflow: hidden;
    }
    .onoper-group-card-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        padding-top: 12px;
        padding-bottom: 36px;
    }
    .onoper-group-card-header[data-named] {
        padding-top: 0px
    } 
    .onoper-group-card-header-named {
        width: 100%;
        height: 12px;
        flex-shrink: 0;
    }
    .onoper-group-card-children {
        display: flex;
        gap: 42px;
        justify-content: center;
        align-items: center;
        padding: 0px 12px;
        padding-bottom: 36px;
    }
    .onoper-group-card-footer {
        padding: 0px 12px;
        padding-bottom: 12px;
    }
`

interface GroupCardProps extends SimpleCardProps {
    children: string;
}

export function GroupCard(props: GroupCardProps) {
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
            <div class="onoper-group-card-footer">
                ${CardFooter({ links, claims, comments })}
            </div>
        </div>
    `;
}