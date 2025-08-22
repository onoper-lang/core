import { OnoperIntermediary } from "./intermediary/intermediary";
import { OnoperLexicalAnalysis } from "./lexicalAnalysis/lexicalAnalysis";
import { OnoperRenderer } from "./renderer/renderer";
import { OnoperSyntacticAnalysis } from "./syntacticAnalysis/syntacticAnalysis";

export class Onoper {
    execute(content: string): string {
        const syntacticAnalysis = new OnoperSyntacticAnalysis();
        const lexer = new OnoperLexicalAnalysis();
        const intermediary = new OnoperIntermediary();
        const renderer = new OnoperRenderer();

        const lexedList = lexer.execute(content);
        
        syntacticAnalysis.execute(lexedList);

        const intermediaryResult = intermediary.execute(lexedList);

        return renderer.render(intermediaryResult);
    }
}
