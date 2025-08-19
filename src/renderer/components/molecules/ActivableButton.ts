import { MIDDLE_ROUNDED } from "../../core/constStyle";
import type { OnoperGenericComponentProps } from "../../core/props";

export const ActivableButtonStyle = `
    .onoper-activable-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 4px;
        border: none;
        cursor: pointer;
        ${MIDDLE_ROUNDED}
    }
    .onoper-activable-button:disabled {
        opacity: 0.1;
        cursor: not-allowed;
    }
    .onoper-button-label {
        opacity: 0;
        position: absolute;
        pointer-events: none;
    }
`

interface ActivableButtonProps extends OnoperGenericComponentProps {
    label: string;
    activable: boolean;
    children: string;
    onClick: () => void;
    style?: string;
}

export function ActivableButton(props: ActivableButtonProps): string {
    const { label, activable, children, onClick, className, style } = props;

    return `
        <button
            class="onoper-activable-button ${className || ''}"
            onclick="${onClick}"
            style="${style || ''}"
            ${activable ? '' : 'disabled'}
            aria-label="${label}"
        >
            ${children}
            <span class="onoper-button-label">${label}</span>
        </button>
    `;
}