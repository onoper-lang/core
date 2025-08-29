import "./styles.css";
import type { OnoperComponentProps } from "../../../component/types";
import { ClaimIcon } from "../../atoms/ClaimIcon";
import { CommentIcon } from "../../atoms/CommentIcon";
import { ActivableButton } from "../../molecules/ActivableButton";
import { ContentAccordion } from "../../molecules/ContentAccordion";
import { SimpleCardFooter } from "../../molecules/SimpleCardFooter";
import { SimpleCardHeader } from "../../molecules/SimpleCardHeader";
import { html } from 'lit';

export interface SimpleCardProps extends OnoperComponentProps {
    uid: string;
    named?: string;
    title: string;

    links: string[];
    claims: string[];
    comments: string[];
}

function _handleSelectClick(uid: string) {
    const element = document.querySelector(`#id_${uid}`);
    const attribute = element?.getAttribute('data-active');
    if (!element || !attribute) return;
    if (attribute === 'none') return;

    element.setAttribute('data-active', attribute === 'true' ? 'false' : 'true');
}

export function SimpleCard(props: SimpleCardProps) {
    const { named, title, links, claims, comments, className, uid } = props;
    
    return html`
        <div
            id="id_${uid}"
            class="onoper-simple-card ${className || ''}"
            data-active="false"
            onclick="${() => _handleSelectClick(uid)}"
        >
            ${SimpleCardHeader({ title: title, named: named })}
            <div
                class="onoper-simple-card-main"
                data-has-content="${claims.length > 0 || comments.length > 0}"
            >
                ${ContentAccordion({
                    title: "Problemas",
                    list: claims,
                    icon: ActivableButton({
                        label: "Problemas",
                        activable: claims.length > 0,
                        style: `background-color: var(--CLAIM_COLOR);`,
                        children: ClaimIcon({}),
                    })
                })}
                ${ContentAccordion({
                    title: "Comentários",
                    list: comments,
                    icon: ActivableButton({
                        label: "Comentários",
                        activable: comments.length > 0,
                        style: `background-color: var(--COMMENT_COLOR);`,
                        children: CommentIcon({}),
                    })
                })}
            </div>
            <div
                class="onoper-simple-card-footer-container"
                data-has-content="${links.length > 0 || claims.length > 0 || comments.length > 0}"
            >
                ${SimpleCardFooter({ links: links, claims: claims, comments: comments })}
            </div>
        </div>
    `;
}