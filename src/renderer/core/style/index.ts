// import { ActivableButtonStyle } from "../../components/molecules/ActivableButton";
// import { ContentAccordionStyle } from "../../components/molecules/ContentAccordion";
// import { GroupFooterCardStyle } from "../../components/molecules/GroupCardFooter";
// import { SimpleFooterCardStyle } from "../../components/molecules/SimpleCardFooter";
// import { SimpleCardHeaderStyle } from "../../components/molecules/SimpleCardHeader";

export const styleTable = new Map<string, string>([]);

export function resolveStyle(season: string): string {
    const styleList: string[] = [];
    styleTable.forEach((style) => {
        styleList.push(style);
    });

    return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
            
            .onoper-root_${season} * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                font-family: "Jost", sans-serif;
                font-optical-sizing: auto;
                font-style: normal;
            }

            .onoper-root_${season} h1,
            .onoper-root_${season} h2,
            .onoper-root_${season} h3,
            .onoper-root_${season} h4,
            .onoper-root_${season} h5,
            .onoper-root_${season} h6 {
                font-weight: 500;
            }
            .onoper-root_${season} h1 {
                font-size: 24px;
            }
            .onoper-root_${season} h2 {
                font-size: 20px;
            }
            .onoper-root_${season} h3 {
                font-size: 16px;
            }
            .onoper-root_${season} h4,
            .onoper-root_${season} h5,
            .onoper-root_${season} h6 {
                font-size: 14px;
            }
            .onoper-root_${season} p {
                font-size: 16px;
                font-weight: 400;
            }
            
            ${styleList.join("\n")}
        </style>
    `;
}