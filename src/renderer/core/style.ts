import { ActivableButtonStyle } from "../components/molecules/ActivableButton";
import { ContentAccordionStyle } from "../components/molecules/ContentAccordion";
import { GroupFooterCardStyle } from "../components/molecules/GroupCardFooter";
import { SimpleFooterCardStyle } from "../components/molecules/SimpleCardFooter";
import { SimpleCardHeaderStyle } from "../components/molecules/SimpleCardHeader";
import { GroupCardStyle } from "../components/organisms/GroupCard";
import { RootStyle } from "../components/organisms/Root";
import { SimpleCardStyle } from "../components/organisms/SimpleCard";

export function resolveStyle(): string {
    return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');

            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                font-family: "Jost", sans-serif;
                font-optical-sizing: auto;
                font-style: normal;
            }

            h1, h2, h3, h4, h5, h6 {
                font-weight: 500;
            }
            h1 { font-size: 24px; }
            h2 { font-size: 20px; }
            h3 { font-size: 16px; }
            h4, h5, h6 { font-size: 14px; }
            p {
                font-size: 16px;
                font-weight: 400;
            }

            ${RootStyle}
            ${SimpleCardStyle}
            ${GroupCardStyle}
            ${GroupFooterCardStyle}
            ${SimpleFooterCardStyle}
            ${SimpleCardHeaderStyle}
            ${ActivableButtonStyle}
            ${ContentAccordionStyle}
        </style>
    `;
}