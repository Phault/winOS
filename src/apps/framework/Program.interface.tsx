import { OS } from '../../OS';

export interface Program<A = any> {
  name: string;
  icon?: string;
  fileExtensions?: string[];
  run(os: OS, args?: A): void;
}
