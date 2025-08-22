import { v7 as uuid } from "uuid"

export type IntermediaryType = "TASK" | "ROOT";

export interface OnoperIntermediaryDTO {
    UID: string;
    namedID: string;
    type: IntermediaryType;
    content: string;
    children: OnoperIntermediaryDTO[];
    links: string[];
    claims: string[];
    comments: string[];
}

export type CreateIntermediaryDTO = Partial<OnoperIntermediaryDTO> & {
    type: IntermediaryType,
    content: string,
}

export class OnoperIntermediaryEntity {
    uid: string;
    namedID: string;
    type: IntermediaryType;
    content: string;
    children: OnoperIntermediaryEntity[] = [];
    links: string[] = [];
    claims: string[] = [];
    comments: string[] = [];

    constructor(dto: CreateIntermediaryDTO) {
        this.uid = dto.UID || uuid();
        this.namedID = dto.namedID || "";
        this.type = dto.type;
        this.content = dto.content;
        this.children = (dto.children || []).map(child => new OnoperIntermediaryEntity(child));
        this.links = dto.links || [];
        this.claims = dto.claims || [];
        this.comments = dto.comments || [];
    }

    static fromDTO(dto: OnoperIntermediaryDTO): OnoperIntermediaryEntity {
        return new OnoperIntermediaryEntity(dto);
    }

    toDTO(): OnoperIntermediaryDTO {
        return {
            UID: this.uid,
            namedID: this.namedID,
            type: this.type,
            content: this.content,
            children: this.children.map(child => child.toDTO()),
            links: this.links,
            claims: this.claims,
            comments: this.comments
        };
    }

    addChild(child: OnoperIntermediaryEntity): void {
        this.children.push(child);
    }

    addLink(link: string): void {
        this.links.push(link);
    }

    addClaim(claim: string): void {
        this.claims.push(claim);
    }

    addComment(comment: string): void {
        this.comments.push(comment);
    }
}