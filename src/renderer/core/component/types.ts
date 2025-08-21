export interface OnoperComponentProps {
    className?: string;
}

export type OnoperLogic = Record<string, (...args: any[]) => any>;

export interface OnoperComponentToRender<T> {
    props: T;
    template: (props: T) => string;
    style: string;
    logic: OnoperLogic;
}

export type OnoperRenderedComponent = string;