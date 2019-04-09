import React from 'react';
import icon from '../../assets/icons/apps/notepad.png';
import { Program } from '../framework/Program.interface';
import { MenuBar } from '../framework/widgets/menubar/MenuBar';
import { Item, Separator } from 'react-contexify';
import { BFSRequire } from 'browserfs';
import './Notepad.scss';

export const NotepadApp: Program<string> = {
  name: 'Notepad',
  icon,
  fileExtensions: [
    'txt'
  ],
  run: async (os, args) => {
    const path = args || 'test.txt';
    let file: string;
    try {
      file = os.fileSystem!.readFileSync(path).toString();
    } catch (e) {
      file = '';
    }

    const nodePath = BFSRequire('path');
    const fileName = nodePath.basename(path);
    
    os.windowManager.create({
      title: `${fileName || 'Untitled'} - ${NotepadApp.name}`,
      icon: NotepadApp.icon,
      rect: {
        left: 200,
        top: 150,
        width: 300,
        height: 200,
      },
      minSize: {
        width: 120,
        height: 100,
      },
      body: window => (
        <React.Fragment>
          <MenuBar>
            <MenuBar.Menu label='File'>
              <Item>New</Item>
              <Item>Open...</Item>
              <Item>Save</Item>
              <Item>Save As...</Item>
              <Separator />
              <Item>Page Setup...</Item>
              <Item>Print...</Item>
              <Separator />
              <Item onClick={() => window.destroy()}>Exit</Item>
            </MenuBar.Menu>

            <MenuBar.Menu label='Edit'>
              <Item disabled>Undo</Item>
              <Separator />
              <Item disabled>Cut</Item>
              <Item disabled>Copy</Item>
              <Item disabled>Paste</Item>
              <Item disabled>Delete</Item>
              <Separator />
              <Item disabled>Find...</Item>
              <Item disabled>Find Next</Item>
              <Item>Replace...</Item>
              <Item>Go To...</Item>
              <Separator />
              <Item>Select All</Item>
              <Item>Time/Date</Item>
            </MenuBar.Menu>

            <MenuBar.Menu label='Format'>
              <Item>Word Wrap</Item>
              <Item>Font...</Item>
            </MenuBar.Menu>

            <MenuBar.Menu label='View'>
              <Item>Status Bar</Item>
            </MenuBar.Menu>

            <MenuBar.Menu label='Help'>
              <Item>Help Topics</Item>
              <Separator />
              <Item>About Notepad</Item>
            </MenuBar.Menu>
          </MenuBar>

          <textarea 
            className="notepad-textarea wordwrap"
            autoComplete='off' 
            autoCorrect='off' 
            autoCapitalize='off' 
            spellCheck={false} 
            onChange={e => os.fileSystem!.writeFileSync(path, e.currentTarget.value, { flag: 'w+' })} 
            defaultValue={file} />
        </React.Fragment>
      )
    });
  }
};