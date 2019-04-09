import React from 'react';
import { Menu, animation, Submenu, Item, Separator } from "react-contexify";

export const FolderContextMenu = ({id}: {id: string}) => (
    <Menu id={id} animation={animation.fade}>
        <Submenu label="Arrange Icons By">
            <Item>Name</Item>
            <Item>Size</Item>
            <Item>Type</Item>
            <Item>Modified</Item>
            <Separator />
            <Item disabled>Show in Groups</Item>
            <Item>Auto Arrange</Item>
            <Item>Align to Grid</Item>
            <Separator />
            <Item>Show Desktop Icons</Item>
            <Item>Lock Web Items on Desktop</Item>
            <Item>Run Desktop Cleanup Wizard</Item>
        </Submenu>
        <Item>Refresh</Item>
        <Separator />
        <Item disabled>Paste</Item>
        <Item disabled>Paste Shortcut</Item>
        <Item>Undo Rename</Item>
        <Separator />
        <Submenu label="New">
            <Item>Folder</Item>
            <Item>Shortcut</Item>
            <Item>Briefcase</Item>
            <Item>Bitmap Image</Item>
            <Item>Wordpad Document</Item>
            <Item>Rich Text Document</Item>
            <Item>Text Document</Item>
            <Item>Wave Sound</Item>
            <Item>Compressed (zipped) Folder</Item>
        </Submenu>
        <Item>Properties</Item>
    </Menu>
);