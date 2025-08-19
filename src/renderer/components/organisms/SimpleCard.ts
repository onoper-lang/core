import { BACKGROUND_ALT_COLOR, BACKGROUND_COLOR, BOX_SHADOW, EXTERN_ROUNDED } from "../../core/constStyle";
import type { OnoperGenericComponentProps } from "../../core/props";
import { CardFooter } from "../molecules/CardFooter";
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
`

export interface SimpleCardProps extends OnoperGenericComponentProps {
    uid: string;
    named?: string;
    title: string;

    links: string[];
    claims: string[];
    comments: string[];
}

export function SimpleCard(props: SimpleCardProps): string {
    const { named, title, links, claims, comments, className } = props;

    return `
        <div
            id="id_${props.uid}"
            class="onoper-simple-card ${className || ''}"
        >
            ${SimpleCardHeader({ title, named })}
            ${CardFooter({ links, claims, comments })}
        </div>
    `;
}