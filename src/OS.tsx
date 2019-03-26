import FS from 'browserfs/dist/node/core/FS';
import { WindowManager } from './windows/WindowManager';
import { Program } from "./apps/framework/Program.interface";
export interface OS {
  fileSystem: FS;
  windows: WindowManager;
  apps: Program[];
}
