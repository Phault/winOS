import React, { Component, ReactNode } from 'react';
import './App.css';
import TaskBar from './taskbar/TaskBar';
import { UncontrolledWindowProps } from './windows/UncontrolledWindow';
import Desktop from './desktop/Desktop';
import './ContextMenu.scss';
import { Rectangle } from './misc/Rectangle';
import { Size } from './misc/Size';
import BFS, { BFSRequire } from 'browserfs';
import { ExplorerApp } from "./apps/explorer/ExplorerApp";
import { WindowManager } from './windows/WindowManager';
import { WinApp } from './apps/framework/WinApp';
import { NotepadApp } from './apps/notepad/NotepadApp';
import { WindowRenderer } from './windows/WindowRenderer';
const BrowserFS: typeof BFS = require('browserfs');

interface Process {
  PID: number;
  File: any;
  User: string;
}

export enum WindowState {
  Normal,
  Maximized,
  Minimized
}

interface WindowDefaults extends UncontrolledWindowProps {
  state: WindowState;
  focused: boolean;
}

interface WindowContext {
  app: WinApp;
  manager: WindowManager;
}

export interface WindowInstance {
  // id: number;
  parentId?: number;
  title: string;
  icon?: string;
  rect: Rectangle;
  minSize: Size;
  state: WindowState;
  body: ReactNode;
}

const windows = new WindowManager();

BrowserFS.configure({
  fs: 'LocalStorage',
  options: {}
}, e => {
  if (e)
      throw e;

  const os = { windows, fileSystem: BFSRequire('fs'), apps: [] };

  if (!localStorage.getItem('installed')) {
    // install os
    os.fileSystem.mkdirSync('/folder');

    localStorage.setItem('installed', 'true');
  }

  NotepadApp.run(os, '/text.txt');
  // NotepadApp.run(os, '/folder/otherfile.txt');
  ExplorerApp.run(os, '/');
});

interface AppState {
}

class App extends Component<{}, AppState> {
  blockEvent(e: React.BaseSyntheticEvent<any>) {
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development')
      e.preventDefault();
  }

  render() {
    return (
      <div className="App" onContextMenu={this.blockEvent}>
        <Desktop />
        <WindowRenderer windowManager={windows} />
        <TaskBar height={30} windowManager={windows} />
      </div>
    );
  }
}

export default App;
