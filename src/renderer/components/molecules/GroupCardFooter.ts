import { CLAIM_COLOR, COMMENT_COLOR, MIDDLE_ROUNDED } from "../../core/constStyle";
import { generateColorFromId } from "../../core/utils";
import { ClaimIcon } from "../atoms/ClaimIcon";
import { CommentIcon } from "../atoms/CommentIcon";
import { ActivableButton } from "./ActivableButton";

export const GroupFooterCardStyle = `
    .onoper-group-card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .onoper-group-footer-actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .onoper-group-footer-links {
        display: flex;
        align-items: center;
        gap: -3px;
    }
    .onoper-group-footer-link {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        ${MIDDLE_ROUNDED}
    }
`

interface GroupCardFooterProps {
    links: string[];
    claims: string[];
    comments: string[];
}

export function GroupCardFooter(props: GroupCardFooterProps) {
    const { links, claims, comments } = props;

    return `
        <div class="onoper-group-card-footer">
            <span class="onoper-group-footer-actions">
                ${ActivableButton({
                    activable: claims.length > 0,
                    label: "Problemas",
                    children: ClaimIcon(),
                    onClick: () => console.log("Claim clicked"),
                    style: `background-color: ${CLAIM_COLOR};`,
                })}
                ${ActivableButton({
                    activable: comments.length > 0,
                    label: "Comentários",
                    children: CommentIcon(),
                    onClick: () => console.log("Comment clicked"),
                    style: `background-color: ${COMMENT_COLOR};`,
                })}
            </span>
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