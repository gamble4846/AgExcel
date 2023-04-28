import { Subject } from "rxjs";

export interface AGEColumn {
    title?: string;
    width?: string;
    type?: string;
    source?: any;
    options?: any;
    AgOnChangeSubject?: Subject<any>;
}

export interface AGEOnChangeModel {
    instance: HTMLElement,
    cell: HTMLElement,
    x: string,
    y: string,
    value: string
}