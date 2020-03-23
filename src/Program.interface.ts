import { OS } from './OS';

export type FileIcon = string | null | undefined;
export type FileTypeAssociations = { [ext: string]: FileIcon };

export interface Program {
  name: string;
  description?: string;
  icon?: string;
  fileExtensions?: FileTypeAssociations;
  hidden?: boolean;
  run(os: OS, args?: string): Promise<number | void>;
}
