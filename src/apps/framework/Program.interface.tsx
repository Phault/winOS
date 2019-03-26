import { OS } from '../../OS';

export interface Program<A = any> {
  name: string;
  icon?: string;
  run(os: OS, args?: A): void;
}
