import { CLAIM_COLOR, COMMENT_COLOR } from "../../../core/style/consts";
import type { OnoperComponentProps, OnoperLogic } from "../../../core/component/types";
import { ClaimIcon } from "../../atoms/ClaimIcon";
import { CommentIcon } from "../../atoms/CommentIcon";
import { ActivableButton } from "../../molecules/ActivableButton";
import { ContentAccordion } from "../../molecules/ContentAccordion";
import { SimpleCardFooter } from "../../molecules/SimpleCardFooter";
import { SimpleCardHeader } from "../../molecules/SimpleCardHeader";
import { OnoperComponent } from "../../../core/component";
import { style } from "./styles";

export function handleSelectClick(uid: string) {
    const element = document.querySelector(`#id_${uid}`);
    const attribute = element?.getAttribute('data-active');
    if (!element || !attribute) return;
    if (attribute === 'none') return;
    
    element.setAttribute('data-active', attribute === 'true' ? 'false' : 'true');
}

export interface SimpleCardProps extends OnoperComponentProps {
    uid: string;
    named?: string;
    title: string;

    links: string[];
    claims: string[];
    comments: string[];
}

function SimpleCardTemplate(props: SimpleCardProps) {
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

export function SimpleCard(props: SimpleCardProps): string {
    const template = SimpleCardTemplate;
    const logic: OnoperLogic = { handleSelectClick };

    const component = new OnoperComponent(
        { props, template, style, logic }
    );

    return component.render();
}