import { OnoperComponent } from "../../../core/component";
import type { OnoperComponentProps } from "../../../core/component/types";
import { CLAIM_COLOR, COMMENT_COLOR } from "../../../core/style/consts";
import { generateColorFromId } from "../../../core/utils";
import { ClaimIcon } from "../../atoms/ClaimIcon";
import { CommentIcon } from "../../atoms/CommentIcon";
import { ActivableButton } from "../ActivableButton";
import { ContentAccordion } from "../ContentAccordion";
import { style } from "./styles";

interface GroupCardFooterProps extends OnoperComponentProps {
    links: string[];
    claims: string[];
    comments: string[];
}

export function GroupCardFooterTemplate(props: GroupCardFooterProps) {
    const { links, claims, comments } = props;

    return `
        <div class="onoper-group-card-footer">
            ${ContentAccordion({
                title: "Problemas",
                list: claims,
                icon: ActivableButton({
                    activable: claims.length > 0,
                    label: "Problemas",
                    children: ClaimIcon({}),
                    style: `background-color: ${CLAIM_COLOR};`,
                })
            })}
            ${ContentAccordion({
                title: "Comentários",
                list: comments,
                icon: ActivableButton({
                    activable: comments.length > 0,
                    label: "Comentários",
                    children: CommentIcon({}),
                    style: `background-color: ${COMMENT_COLOR};`,
                })
            })}
            <span class="onoper-group-footer-links">
                ${links.map(link => 
                    `<span
                        class="onoper-group-footer-link"
                        aria-label="${link}"
                        style="background-color: ${generateColorFromId(link)};"
                    ></span>`
                ).join("")}
            </span>
        </div>
    `;
}

export function GroupCardFooter(props: GroupCardFooterProps): string {
    const template = GroupCardFooterTemplate;

    return new OnoperComponent({
        props,
        style,
        logic: {},
        template,
    }).render();
}