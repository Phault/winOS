import React from 'react';
import { Menu, Submenu, Item, Separator } from 'react-contexify';

export function FileContextMenu({ id }: { id: string }) {
  return (
    <Menu id={id}>
      <Item>
        <b>Open</b>
      </Item>
      <Item>Run as...</Item>
      <Item>Pin to Start menu</Item>
      <Separator />
      <Submenu label="Send To">
        <Item>Compressed (zipped) Folder</Item>
        <Item>Desktop (create shortcut)</Item>
        <Item>Mail Recipient</Item>
        <Item>My Documents</Item>
        <Item>3½ Floppy (A:)</Item>
      </Submenu>
      <Separator />
      <Item>Cut</Item>
      <Item>Copy</Item>
      <Separator />
      <Item>Create Shortcut</Item>
      <Item>Delete</Item>
      <Item>Rename</Item>
      <Separator />
      <Item>Properties</Item>
    </Menu>
  );
}
