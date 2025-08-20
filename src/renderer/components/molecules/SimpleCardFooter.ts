import { CLAIM_COLOR, COMMENT_COLOR, MIDDLE_ROUNDED } from "../../core/constStyle";
import { generateColorFromId } from "../../core/utils";
import { ClaimIcon } from "../atoms/ClaimIcon";
import { CommentIcon } from "../atoms/CommentIcon";
import { ActivableButton } from "./ActivableButton";

export const SimpleFooterCardStyle = `
    .onoper-simple-card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .onoper-simple-footer-actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .onoper-simple-footer-links {
        display: flex;
        align-items: center;
        gap: -3px;
    }
    .onoper-simple-footer-link {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        ${MIDDLE_ROUNDED}
    }
`

interface SimpleCardFooterProps {
    links: string[];
    claims: string[];
    comments: string[];
}

export function SimpleCardFooter(props: SimpleCardFooterProps) {
    const { links, claims, comments } = props;

    return `
        <div class="onoper-simple-card-footer">
            <span class="onoper-simple-footer-actions">
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