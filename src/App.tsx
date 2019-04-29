import React, { useState, useEffect, useMemo } from 'react';
import './ContextMenu.scss';
import BFS, { BFSRequire } from 'browserfs';
import { WindowManager } from './windows/WindowManager';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { ProgramManager } from './apps/ProgramManager';
import { ProcessManager } from './apps/ProcessManager';
import { installOS } from './installOS';
import { LoadingScreen } from './LoadingScreen';
import { OS } from './OS';
import { DesktopEnvironment } from './DesktopEnvironment';
import styled from 'styled-components/macro';
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

export const OSContext = React.createContext<OS | null>(null)

function blockEvent(e: React.BaseSyntheticEvent<any>) {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development')
    e.preventDefault();
}

const StyledApp = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  font-family: Tahoma;
  font-size: 11px;
  color: black;
`;

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

  useEffect(() => {
    loadFileSystem().then(fileSystem => setFiles(fileSystem));
  }, []);

  return (
    <OSContext.Provider value={os}>
        <StyledApp onContextMenu={blockEvent}>
          {files ? <DesktopEnvironment /> : <LoadingScreen />}
        </StyledApp>
    </OSContext.Provider>
  );
}

export default App;
