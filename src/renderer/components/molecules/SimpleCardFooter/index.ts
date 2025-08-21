import { OnoperComponent } from "../../../core/component";
import type { OnoperComponentProps } from "../../../core/component/types";
import { CLAIM_COLOR, COMMENT_COLOR } from "../../../core/style/consts";
import { generateColorFromId } from "../../../core/utils";
import { ClaimIcon } from "../../atoms/ClaimIcon";
import { CommentIcon } from "../../atoms/CommentIcon";
import { ActivableButton } from "../ActivableButton";
import { style } from "./styles";

interface SimpleCardFooterProps extends OnoperComponentProps {
    links: string[];
    claims: string[];
    comments: string[];
}

export function SimpleCardFooterTemplate(props: SimpleCardFooterProps) {
    const { links, claims, comments } = props;

    return `
        <div class="onoper-simple-card-footer">
            <span class="onoper-simple-footer-actions">
                ${ActivableButton({
                    activable: claims.length > 0,
                    label: "Problemas",
                    children: ClaimIcon({}),
                    style: `background-color: ${CLAIM_COLOR};`,
                })}
                ${ActivableButton({
                    activable: comments.length > 0,
                    label: "Comentários",
                    children: CommentIcon({}),
                    style: `background-color: ${COMMENT_COLOR};`,
                })}
            </span>
            <span class="onoper-simple-footer-links">
                ${links.map(link => 
                    `<span
                        class="onoper-simple-footer-link"
                        aria-label="${link}"
                        style="background-color: ${generateColorFromId(link)};"
                    ></span>`
                ).join("")}
            </span>
        </div>
    `;
}

export function SimpleCardFooter(props: SimpleCardFooterProps): string {
    const template = SimpleCardFooterTemplate;

    return new OnoperComponent({
        props,
        style,
        logic: {},
        template,
    }).render();
}