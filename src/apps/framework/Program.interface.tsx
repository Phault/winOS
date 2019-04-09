import { OS } from "../../App";

export enum Signal {
  QUIT,
  KILL
}

export type SignalHandler = (signal: Signal) => void;

export interface Program<T = any, R = any> {
  name: string;
  description?: string;
  icon?: string;
  fileExtensions?: string[];
  run(os: OS, args?: T): Promise<R>;
}