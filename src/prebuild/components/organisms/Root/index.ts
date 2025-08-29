import "./styles.css";
import type { OnoperComponentProps } from "../../../component/types";
import { type TemplateResult, html } from 'lit';

interface RootProps extends OnoperComponentProps {
    children?: TemplateResult;
}

export function Root(props: RootProps) {
    const { children } = props;

    return html`
        <div class='onoper-root'>
            <div class='onoper-viewport'>
                ${children}
            </div>
        </div>
    `;
}