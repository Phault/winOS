import React, { FC, useContext } from 'react';
import * as Toolbar from '../../../widgets/toolbar';
import { MenuBar } from '../../../widgets/menubar/MenuBar';
import { MenuBarMenu } from '../../../widgets/menubar/MenuBarMenu';
import { Submenu, Separator, Item } from 'react-contexify';
import { CreateNewItems } from '../../../widgets/folderview/FolderContextMenu';
import { ViewModeItems } from './ViewModeItems';
import { WindowsIcon } from './WindowsIcon';
import { WindowContext } from '../../../windows/WindowManager';

export const ToolbarMenu: FC<{ path: string }> = ({ path }) => {
  const window = useContext(WindowContext)!;

  return (
    <Toolbar.Toolbar>
      <MenuBar>
        <MenuBarMenu label="File">
          <Submenu label="New">
            <CreateNewItems path={path} />
          </Submenu>
          <Separator />
          <Item disabled>Create Shortcut</Item>
          <Item disabled>Delete</Item>
          <Item disabled>Rename</Item>
          <Item disabled>Properties</Item>
          <Separator />
          <Item onClick={() => window.destroy()}>Close</Item>
        </MenuBarMenu>
        <MenuBarMenu label="Edit">
          <Item disabled>Undo</Item>
          <Separator />
          <Item disabled>Cut</Item>
          <Item disabled>Copy</Item>
          <Item disabled>Paste</Item>
          <Item disabled>Paste Shortcut</Item>
          <Separator />
          <Item disabled>Copy To Folder...</Item>
          <Item disabled>Move To Folder...</Item>
          <Separator />
          <Item>Select All</Item>
          <Item>Invert Selection</Item>
        </MenuBarMenu>
        <MenuBarMenu label="View">
          <Submenu label="Toolbars">
            <Item>Standard Buttons</Item>
            <Item>Address Bar</Item>
            <Item>Links</Item>
            <Separator />
            <Item>Lock the Toolbars</Item>
            <Item>Customize...</Item>
          </Submenu>
          <Item>Status Bar</Item>
          <Submenu label="Explorer Bar">
            <Item>Search</Item>
            <Item>Favorites</Item>
            <Item>History</Item>
            <Item>Folders</Item>
            <Separator />
            <Item>Tip of the Day</Item>
          </Submenu>
          <Separator />
          <ViewModeItems />
          <Separator />
          <Submenu label="Arrange Icons by">
            <Item>Name</Item>
            <Item>Size</Item>
            <Item>Type</Item>
            <Item>Modified</Item>
            <Separator />
            <Item>Show in Groups</Item>
            <Item>Auto Arrange</Item>
            <Item>Align to Grid</Item>
          </Submenu>
          <Separator />
          <Item>Choose Details...</Item>
          <Submenu label="Go To">
            <Item disabled>Back</Item>
            <Item disabled>Forward</Item>
            <Item>Up One Level</Item>
            <Separator />
            <Item>Home Page</Item>
            <Separator />
            <Item>My Documents</Item>
          </Submenu>
          <Item>Refresh</Item>
        </MenuBarMenu>
        <MenuBarMenu label="Favorites">
          <Item>Add to Favorites...</Item>
          <Item>Organize Favorites...</Item>
          <Separator />
          <Submenu label="Links">
            <Item>Customize Links</Item>
            <Item>Free Hotmail</Item>
            <Item>Windows</Item>
            <Item>Windows Marketplace</Item>
            <Item>Windows Media</Item>
          </Submenu>
          <Item>MSN.com</Item>
          <Item>Radio Station Guide</Item>
        </MenuBarMenu>
        <MenuBarMenu label="Tools">
          <Item>Map Network Drive...</Item>
          <Item>Disconnect Network Drive...</Item>
          <Item>Synchronize...</Item>
          <Separator />
          <Item>Folder Options...</Item>
        </MenuBarMenu>
        <MenuBarMenu label="Help">
          <Item>Help and Support Center</Item>
          <Separator />
          <Item>Is this copy of Windows legal?</Item>
          <Item>About Windows</Item>
        </MenuBarMenu>
      </MenuBar>
      <WindowsIcon />
    </Toolbar.Toolbar>
  );
};
