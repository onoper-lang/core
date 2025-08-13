import type { OnoperIntermediaryDTO } from "../models/intermediary";
import { RootComponent } from "./components/root.component";
import { TaskComponent } from "./components/task.component";
import { resolveStyle } from "./style";

export class OnoperRenderer {
    private recursiveRender(item: OnoperIntermediaryDTO): string | null {
        if (item.type === "TASK") {
            const children = item.children.map(child => this.recursiveRender(child)).join("");
            return TaskComponent(item, children);
        } else if (item.type === "ROOT") {
            const children = item.children.map(child => this.recursiveRender(child)).join("");
            return RootComponent(children);
        }

        return null;
    }

    render(item: OnoperIntermediaryDTO): string {
        const html = `
            ${resolveStyle()}
            ${this.recursiveRender(item)}
        `.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
        return html;
    }
}