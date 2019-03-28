import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import TaskBar from './taskbar/TaskBar';
import Desktop from './desktop/Desktop';
import './ContextMenu.scss';
import BFS, { BFSRequire } from 'browserfs';
import { WindowManager } from './windows/WindowManager';
import { WindowRenderer } from './windows/WindowRenderer';
import { FSModule } from 'browserfs/dist/node/core/FS';
import { NotepadApp } from './apps/notepad/NotepadApp';
import { ExplorerApp } from './apps/explorer/ExplorerApp';
import { OS } from './OS';
const BrowserFS: typeof BFS = require('browserfs');

export enum WindowState {
  Normal,
  Maximized,
  Minimized
}


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
      
        if (!localStorage.getItem('installed')) {
          // install os
          fileSystem.writeFileSync('/file.txt', 'Hello world!');
          
          fileSystem.mkdirSync('/folder');
          fileSystem.writeFileSync('/folder/test.txt', 'Just another file..');
      
          localStorage.setItem('installed', 'true');
        }
    
        resolve(BFSRequire('fs'));
      });
    }
  );
}

export const FileSystemContext = React.createContext<FSModule | null>(null);
export const WindowManagerContext = React.createContext<WindowManager>(new WindowManager());

function App() {
  const [fileSystem, setFileSystem] = useState<FSModule | null>(null);
  
  function blockEvent(e: React.BaseSyntheticEvent<any>) {
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development')
      e.preventDefault();
  }

  useEffect(() => {
    loadFileSystem().then(fileSystem => setFileSystem(fileSystem));
  }, []);

  return (
    <FileSystemContext.Provider value={fileSystem}>
        <div className="App" onContextMenu={blockEvent}>
          {fileSystem ? <DesktopEnvironment /> : <LoadingScreen />}
        </div>
    </FileSystemContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <span>Loading...</span>
  );
}

function useAppContext(): OS {
  const windowManager = useContext(WindowManagerContext); 
  const fileSystem = useContext(FileSystemContext); 

  return {
    apps: [],
    windows: windowManager,
    fileSystem: fileSystem!
  };
}

function DesktopEnvironment() {
  const [windowManager] = useState<WindowManager>(new WindowManager());

  const appContext = useAppContext();
  appContext.windows = windowManager;

  useEffect(() => {
    NotepadApp.run(appContext, '/file.txt');
    ExplorerApp.run(appContext);
  }, []);

  return (
    <WindowManagerContext.Provider value={windowManager}>
      <div className="desktop-environment">
        <Desktop />
        <WindowRenderer />
        <TaskBar height={30} />
      </div>
    </WindowManagerContext.Provider>
  );
}

export default App;
