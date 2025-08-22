import { OnoperIntermediary } from "./intermediary/intermediary";
import { OnoperCommonAnalysis } from "./lexicalAnalysis/commonMetacaracteres";
import { OnoperConfigAnalysis } from "./lexicalAnalysis/configMetacaracteres";
import { OnoperLexicalAnalysis } from "./lexicalAnalysis/lexicalAnalysis";
import { OnoperRenderer } from "./renderer/renderer";
import { OnoperSyntacticAnalysis } from "./syntacticAnalysis/syntacticAnalysis";

export class Onoper {
    execute(content: string): string {
        const configAnalysis = new OnoperConfigAnalysis();
        const commonAnalysis = new OnoperCommonAnalysis();
        const lexer = new OnoperLexicalAnalysis(configAnalysis, commonAnalysis);
        const lexedList = lexer.execute(content);

        const syntacticAnalysis = new OnoperSyntacticAnalysis();
        syntacticAnalysis.execute(lexedList);

        const intermediary = new OnoperIntermediary();
        const intermediaryResult = intermediary.execute(lexedList);

        const renderer = new OnoperRenderer();
        return renderer.render(intermediaryResult);
    }
}
