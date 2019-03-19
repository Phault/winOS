import React, { useState } from 'react';
import ieIcon from '../assets/icons/512.png';
import paintIcon from '../assets/icons/paint.png';
import notepadIcon from '../apps/notepad/icon.png';
import { MenuProvider, Menu, animation, Submenu, Item, Separator } from 'react-contexify';
import { FileContextMenu } from './FileContextMenu';
import { FileIcon } from '../apps/framework/widgets/folderview/views/icon/FileIcon';
import { FolderView } from '../apps/framework/widgets/folderview/FolderView';
import { IconView } from '../apps/framework/widgets/folderview/views/icon/IconView';

function Desktop() {
    const [selection, setSelection] = useState<[] | null>(null);

    return (
        <MenuProvider id='desktop' style={{flexGrow: 1}} storeRef={false}>
            <FolderView viewMode={IconView} path='/' />
            {/* <FileIcon icon={notepadIcon}>Notepad</FileIcon>
            <FileIcon icon={ieIcon}>Internet Explorer</FileIcon>
            <FileIcon icon={paintIcon}>Paint</FileIcon>
            <FileIcon icon={ieIcon}>Bitmap176</FileIcon>
            <FileIcon icon={ieIcon}>Firefox Setup 65.0</FileIcon>
            <FileIcon icon={ieIcon}>Firefox Setup 50.0</FileIcon>
            <FileIcon icon={ieIcon}>Mozilla Firefox</FileIcon>
            <FileIcon icon={ieIcon}>WinSCP</FileIcon> */}

            <Menu id='desktop' animation={animation.fade}>
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
            <FileContextMenu />
        </MenuProvider>
    );
}

export default Desktop;