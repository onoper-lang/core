import "./styles.css";
import { OnoperComponent } from "../../../component";
import type { OnoperComponentProps } from "../../../component/types";
import { generateColorFromId } from "../../../utils";
import { ClaimIcon } from "../../atoms/ClaimIcon";
import { CommentIcon } from "../../atoms/CommentIcon";
import { ActivableButton } from "../ActivableButton";
import { ContentAccordion } from "../ContentAccordion";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface GroupCardFooterProps extends OnoperComponentProps {
    links: string[];
    claims: string[];
    comments: string[];
}

@customElement('group-card-footer')
export class GroupCardFooterComponent extends LitElement {

    @property({ attribute: false })
    props: GroupCardFooterProps | undefined;

    override render() {
        if (!this.props) return;

        const { links, claims, comments } = this.props;

        const linkElement = (link: string) => html`
            <span
                class="onoper-group-footer-link"
                aria-label="${link}"
                style="background-color: ${generateColorFromId(link)};"
            ></span>
        `

        return html`
            <div class="onoper-group-card-footer">
                ${ContentAccordion({
                    title: "Problemas",
                    list: claims,
                    icon: ActivableButton({
                        activable: claims.length > 0,
                        label: "Problemas",
                        children: ClaimIcon({}),
                        style: `background-color: var(--CLAIM_COLOR);`,
                    })
                })}
                ${ContentAccordion({
                    title: "Comentários",
                    list: comments,
                    icon: ActivableButton({
                        activable: comments.length > 0,
                        label: "Comentários",
                        children: CommentIcon({}),
                        style: `background-color: var(--COMMENT_COLOR);`,
                    })
                })}
                <span class="onoper-group-footer-links">
                    ${links.map(link => linkElement(link))}
                </span>
            </div>
        `;
    }
}

export function GroupCardFooter(props: GroupCardFooterProps) {
    const element = new GroupCardFooterComponent();
    element.props = props;
    return element.render();
}
