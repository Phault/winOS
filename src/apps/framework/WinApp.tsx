import { OS } from '../../OS';

export interface WinApp<A = any> {
  name: string;
  icon?: string;
  run(os: OS, args?: A): void;
}
