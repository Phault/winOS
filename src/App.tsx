import React, { useState, useEffect, useMemo } from 'react';
import './App.scss';
import { TaskBar } from './taskbar/TaskBar';
import Desktop from './desktop/Desktop';
import './ContextMenu.scss';
import BFS, { BFSRequire } from 'browserfs';
import { WindowManager } from './windows/WindowManager';
import { WindowRenderer } from './windows/WindowRenderer';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { ProgramManager } from './ProgramManager';
import { ProcessManager } from './ProcessManager';
import { installOS } from './installOS';
const BrowserFS: typeof BFS = require('browserfs');

const VERSION = 3;

function loadFileSystem(): Promise<FSModule> {
  return new Promise<FSModule>(
    (resolve, reject) => {
      BrowserFS.configure({
        fs: 'LocalStorage',
        options: {}
      }, e => {
        if (e)
            reject(e);
      
        const fileSystem = BFSRequire('fs');

        if (Number.parseInt(localStorage.getItem('installed-version') || '-1') !== VERSION) {
          installOS(fileSystem);
          localStorage.setItem('installed-version', VERSION.toString());
        }
    
        resolve(fileSystem);
      });
    }
  );
}

export interface OS {
  fileSystem: FSModule;
  programManager: ProgramManager;
  processManager: ProcessManager;
  windowManager: WindowManager;
}

export const OSContext = React.createContext<OS | null>(null)

function App() {
  const [files, setFiles] = useState<FSModule>();

  const os = useMemo<OS>(() => {
    const os: Partial<OS> = {
      fileSystem: files,
      windowManager: new WindowManager,
      programManager: new ProgramManager
    };

    os.processManager = new ProcessManager(os as OS);

    os.programManager!.install(async () => (await import('./apps/notepad')).NotepadApp).then(p => os.processManager!.run(p));
    os.programManager!.install(async () => (await import('./apps/explorer')).ExplorerApp).then(p => os.processManager!.run(p));
    os.programManager!.install(async () => (await import('./apps/minesweeper')).MinesweeperApp);
  
    return os as OS;
  }, [files]);
  
  function blockEvent(e: React.BaseSyntheticEvent<any>) {
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development')
      e.preventDefault();
  }

  useEffect(() => {
    loadFileSystem().then(fileSystem => setFiles(fileSystem));
  }, []);

  return (
    <OSContext.Provider value={os}>
        <div className="App" onContextMenu={blockEvent}>
          {files ? <DesktopEnvironment /> : <LoadingScreen />}
        </div>
    </OSContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <span>Loading...</span>
  );
}

function DesktopEnvironment() {
  return (
    <div className="desktop-environment">
      <div className="desktop-usable-area">
        <Desktop path="/Documents and Settings/Administrator/Desktop" />
        <WindowRenderer />
      </div>
      <TaskBar height={30} />
    </div>
  );
}

export default App;
