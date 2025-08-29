import "./styles.css";
import type { OnoperComponentProps } from "../../../component/types";
import { generateColorFromId } from "../../../utils";
import { ClaimIcon } from "../../atoms/ClaimIcon";
import { CommentIcon } from "../../atoms/CommentIcon";
import { ActivableButton } from "../ActivableButton";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface SimpleCardFooterProps extends OnoperComponentProps {
    links: string[];
    claims: string[];
    comments: string[];
}

@customElement('simple-card-footer')
export class SimpleCardFooterComponent extends LitElement {

    @property({ attribute: false })
    props: SimpleCardFooterProps | undefined;

    override render() {
        if (!this.props) return;

        const { links, claims, comments } = this.props;

        return html`
            <div class="onoper-simple-card-footer">
                <span class="onoper-simple-footer-actions">
                    ${ActivableButton({
                        activable: claims.length > 0,
                        label: "Problemas",
                        children: ClaimIcon({}),
                        style: `background-color: var(--CLAIM_COLOR);`,
                    })}
                    ${ActivableButton({
                        activable: comments.length > 0,
                        label: "Comentários",
                        children: CommentIcon({}),
                        style: `background-color: var(--COMMENT_COLOR);`,
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
}

export function SimpleCardFooter(props: SimpleCardFooterProps) {
    const element = new SimpleCardFooterComponent();
    element.props = props;
    return element.render();
}