import { WindowManager } from './windows/WindowManager';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { ProgramManager } from './apps/ProgramManager';
import { ProcessManager } from './apps/ProcessManager';

export interface OS {
  fileSystem: FSModule;
  programManager: ProgramManager;
  processManager: ProcessManager;
  windowManager: WindowManager;
}
