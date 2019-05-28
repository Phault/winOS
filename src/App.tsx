import React from 'react';
import './ContextMenu.scss';
import BFS, { BFSRequire } from 'browserfs';
import { WindowManager } from './windows/WindowManager';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { ProgramManager } from './apps/ProgramManager';
import { ProcessManager } from './apps/ProcessManager';
import { WelcomeScreen } from './logon/WelcomeScreen';
import { BootLoader } from './boot/BootLoader';
import { OS } from './OS';
import styled from 'styled-components/macro';
import Loadable from 'react-loadable';
const BrowserFS: typeof BFS = require('browserfs');

function loadFileSystem(): Promise<FSModule> {
  return new Promise<FSModule>(
    (resolve, reject) => {
      BrowserFS.configure({
        fs: 'OverlayFS',
        options: {
          readable: {
            fs: 'XmlHttpRequest',
            options: {
              baseUrl: 'fs/',
              index: 'fs/index.json'
            }
          },
          writable: {
            fs: 'LocalStorage',
            options: {}
          }
        }
      }, e => {
        if (e)
            reject(e);
      
        resolve(BFSRequire('fs'));
      });
    }
  );
}

async function loadProgramManager(): Promise<ProgramManager> {
  const manager = new ProgramManager();

  await Promise.all([
    manager.install(async () => (await import('./apps/notepad')).NotepadApp),
    manager.install(async () => (await import('./apps/explorer')).ExplorerApp),
    manager.install(async () => (await import('./apps/minesweeper')).MinesweeperApp),
    manager.install(async () => (await import('./apps/pictureviewer')).PictureViewerApp),

    manager.install(async () => (await import('./apps/funbox')).Funbox),
    manager.install(async () => (await import('./apps/bowmania')).Bowmania)
  ]);

  return manager;
}

async function loadOS(): Promise<OS> {
  const os: Partial<OS> = {
    fileSystem: await loadFileSystem(),
    programManager: await loadProgramManager(),
    windowManager: new WindowManager()
  };

  os.processManager = new ProcessManager(os as OS);

  return os as OS;
}

function wait(ms: number): Promise<never> {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'development')
    return new Promise(resolve => resolve());

  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const LoadableDesktopEnvironment = Loadable({
  loader: () => Promise.all([import('./DesktopEnvironment'), wait(1500)]).then(r => r[0]),
  loading: () => <WelcomeScreen />,
  render(loaded, props) {
    return <loaded.DesktopEnvironment {...props}/>
  }
});

const LoadableOS = Loadable({
  loader: () => Promise.all([loadOS(), wait(2000)]).then(r => r[0]),
  loading: () => <BootLoader />,
  render(loaded, props) {
    return <OSContext.Provider value={loaded} {...props} />;
  }
})

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
  return (
    <StyledApp onContextMenu={blockEvent} onDragStart={blockEvent}>
      <LoadableOS>
        <LoadableDesktopEnvironment />
      </LoadableOS>
    </StyledApp>
  );
}

export default App;
