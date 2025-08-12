import { expect, test } from "bun:test";
import { OnoperRenderer } from "./renderer"
import type { OnoperIntermediaryDTO } from "../models/intermediary";

test("OnoperRenderer should render ROOT type correctly", () => {
    const renderer = new OnoperRenderer();

    const item: OnoperIntermediaryDTO = {
        type: "ROOT",
        content: "Root Content",
        namedID: "",
        children: [],
        UID: "root-uid",
        links: [],
        claims: [],
        comments: []
    };

    const result = renderer.render(item);
    expect(result).toBe("<div class='onoper-root'><main class='onoper-children'></main></div>");
});

test("OnoperRenderer should render TASK type correctly", () => {
    const renderer = new OnoperRenderer();

    const item: OnoperIntermediaryDTO = {
        type: "TASK",
        content: "Task Content",
        namedID: "task-named-id",
        children: [],
        UID: "task-uid",
        links: ["link1"],
        claims: [],
        comments: []
    };

    const result = renderer.render(item);
    expect(result).toBe("<articleclass='onoper-task'data-has-children='false'data-id='task-named-id'><header><div class='onoper-badge-container'><buttonclass='onoper-badge'data-has-comment='true'data-has-claim='true'><span class='onoper-badge-icon'>💬</span><div class='onoper-messages-container'></div></button></div><p>Task Content</p><div class='onoper-linked'><spanclass='onoper-link'data-linked-id='link1'></span></div></header></article>");
});

test("OnoperRenderer should render nested items correctly", () => {
    const renderer = new OnoperRenderer();

    const item: OnoperIntermediaryDTO = {
        type: "ROOT",
        content: "Root Content",
        namedID: "",
        children: [
            {
                type: "TASK",
                content: "Task Content",
                namedID: "task-named-id",
                children: [],
                UID: "task-uid",
                links: ["link1"],
                claims: [],
                comments: []
            }
        ],
        UID: "root-uid",
        links: [],
        claims: [],
        comments: []
    };

    const result = renderer.render(item);
    expect(result).toBe("<div class='onoper-root'><main class='onoper-children'><articleclass='onoper-task'data-has-children='false'data-id='task-named-id'><header><div class='onoper-badge-container'><buttonclass='onoper-badge'data-has-comment='true'data-has-claim='true'><span class='onoper-badge-icon'>💬</span><div class='onoper-messages-container'></div></button></div><p>Task Content</p><div class='onoper-linked'><spanclass='onoper-link'data-linked-id='link1'></span></div></header></article></main></div>");
});