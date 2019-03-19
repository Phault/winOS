import React from 'react';
import notepadIcon from './icon.png';
import { WinApp } from '../framework/WinApp';
import { WindowState } from '../../App';
import { MenuBar } from '../framework/widgets/menubar/MenuBar';
import { Item, Separator } from 'react-contexify';

export const NotepadApp : WinApp<string> = {
  name: 'Notepad',
  icon: notepadIcon,
  run: ({ windows, fileSystem }, args) => {
    const path = args || 'test.txt';
    var file;
    try {
      file = fileSystem.readFileSync(path).toString();
    } catch (e) {
      file = '';
    }
    
    windows.add({
      title: NotepadApp.name,
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
      state: WindowState.Normal,
      body: (
        <React.Fragment>
          <MenuBar id="Notepad">
            <MenuBar.Menu label='File'>
              <Item>New</Item>
              <Item>Open...</Item>
              <Item>Save</Item>
              <Item>Save As...</Item>
              <Separator />
              <Item>Page Setup...</Item>
              <Item>Print...</Item>
              <Separator />
              <Item>Exit</Item>
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
            style={{ flexGrow: 1 }} 
            autoComplete='off' 
            autoCorrect='off' 
            autoCapitalize='off' 
            spellCheck={false} 
            onChange={e => fileSystem.writeFileSync(path, e.currentTarget.value, { flag: 'w+' })} 
            defaultValue={file} />
        </React.Fragment>
      )
    });
  }
};
