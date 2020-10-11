import { ProcessContext } from './apps/ProcessManager';

export type FileIcon = string | null | undefined;
export type FileTypeAssociations = { [ext: string]: FileIcon };

export interface Program {
  (this: ProcessContext, args: string[]): Promise<void>;
  metadata: ProgramMetadata;
}

export interface ProgramMetadata {
  name: string;
  description?: string;
  icon?: string;
  fileExtensions?: FileTypeAssociations;
  hidden?: boolean;
}
