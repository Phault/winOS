import { OS } from "./App";

export enum Signal {
  QUIT,
  KILL
}

export type SignalHandler = (signal: Signal) => void;

export type FileIcon = string | null | undefined;
export type FileTypeAssociations = { [ext: string]: FileIcon };

export interface Program {
  name: string;
  description?: string;
  icon?: string;
  fileExtensions?: FileTypeAssociations;
  run(os: OS, args?: string): Promise<number | void>;
}