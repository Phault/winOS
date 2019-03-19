import FS from 'browserfs/dist/node/core/FS';
import { WindowManager } from './windows/WindowManager';
import { WinApp } from "./apps/framework/WinApp";
export interface OS {
  fileSystem: FS;
  windows: WindowManager;
  apps: WinApp[];
}
