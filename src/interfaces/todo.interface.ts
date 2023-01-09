import {Status} from "./status.enum";

export type guid = string;
export interface ITodo {
    id: guid
    titlu: string;
    descriere: string;
    status: Status;

    [index: string]: string;
}