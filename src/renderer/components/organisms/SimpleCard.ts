import { ACTIVE_COLOR, BACKGROUND_ALT_COLOR, BACKGROUND_COLOR, BOX_SHADOW, CLAIM_COLOR, COMMENT_COLOR, EXTERN_ROUNDED } from "../../core/constStyle";
import type { OnoperGenericComponentProps } from "../../core/props";
import { ClaimIcon } from "../atoms/ClaimIcon";
import { CommentIcon } from "../atoms/CommentIcon";
import { ActivableButton } from "../molecules/ActivableButton";
import { ContentAccordion } from "../molecules/ContentAccordion";
import { SimpleCardFooter } from "../molecules/SimpleCardFooter";
import { SimpleCardHeader } from "../molecules/SimpleCardHeader";

export const SimpleCardStyle = `
    .onoper-simple-card {
        background-color: ${BACKGROUND_COLOR};
        border: 1px solid ${BACKGROUND_ALT_COLOR};
        ${BOX_SHADOW}
        display: flex;
        flex-direction: column;
        padding: 12px;
        gap: 12px;
        min-width: 25vw;
        max-width: 400px;
        ${EXTERN_ROUNDED}
    }

    .onoper-simple-card-main {
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: all 0.3s ease-in-out;
        max-height: 9999px;
    }

    .onoper-simple-card-footer-container {
        transition: all 0.3s;
        max-height: 9999px;
        opacity: 1;
    }
     
    .onoper-simple-card[data-active="true"] .onoper-simple-card-footer-container,
    .onoper-simple-card[data-active="false"]:hover .onoper-simple-card-footer-container {
        opacity: 0;
        max-height: 0px;
    }

    .onoper-simple-card[data-active="false"] .onoper-simple-card-main,
    .onoper-simple-card[data-active="none"] .onoper-simple-card-main {
        opacity: 0;
        max-height: 0px;
    }

    .onoper-simple-card[data-active="true"] {
        border: 1px solid ${ACTIVE_COLOR};
    }

    .onoper-simple-card[data-active="false"]:hover .onoper-simple-card-main {
        position: relative;
        opacity: 1;
        max-height: 9999px;
    }
`

export interface SimpleCardProps extends OnoperGenericComponentProps {
    uid: string;
    named?: string;
    title: string;

    links: string[];
    claims: string[];
    comments: string[];
}

export function handleSelectClick(uid: string) {
    const element = document.querySelector(`#id_${uid}`);
    const attribute = element?.getAttribute('data-active');
    if (!element || !attribute) return;
    if (attribute === 'none') return;
    
    element.setAttribute('data-active', attribute === 'true' ? 'false' : 'true');
}

export function SimpleCard(props: SimpleCardProps): string {
    const { named, title, links, claims, comments, className } = props;

    return `
        <div
            id="id_${props.uid}"
            class="onoper-simple-card ${className || ''}"
            ${claims.length > 0 || comments.length > 0 ?
                'data-active="false"' :
                'data-active="none"'
            }
            onclick="handleSelectClick('${props.uid}')"
        >
            ${SimpleCardHeader({ title, named })}
            <div class="onoper-simple-card-main">
                ${ContentAccordion({ 
                    title: "Problemas",
                    list: claims,
                    icon: ActivableButton({
                        label: "Problemas",
                        activable: claims.length > 0,
                        style: `background-color: ${CLAIM_COLOR};`,
                        children: ClaimIcon(),
                    })
                })}
                ${ContentAccordion({ 
                    title: "Comentários",
                    list: comments,
                    icon: ActivableButton({
                        label: "Comentários",
                        activable: comments.length > 0,
                        style: `background-color: ${COMMENT_COLOR};`,
                        children: CommentIcon(),
                    })
                })}
            </div>
            <div class="onoper-simple-card-footer-container">
                ${SimpleCardFooter({ links, claims, comments })}
            </div>
        </div>
    `;
}