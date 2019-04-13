import React, { useContext, Fragment } from 'react';
import { Menu, animation, Submenu, Item, Separator } from "react-contexify";
import { OSContext } from '../../App';
import { createNewFolder, createNewFile } from '../../misc/fileUtils';

export function CreateNewItems({path}: {path: string}) {
    const { fileSystem } = useContext(OSContext)!;

    return (
        <Fragment>
            <Item onClick={() => createNewFolder(fileSystem, path)}>Folder</Item>
            <Item>Shortcut</Item>
            <Separator />
            <Item>Briefcase</Item>
            <Item onClick={() => createNewFile(fileSystem, path, 'New Bitmap Image.bmp')}>Bitmap Image</Item>
            <Item onClick={() => createNewFile(fileSystem, path, 'New Wordpad Document.doc')}>Wordpad Document</Item>
            <Item onClick={() => createNewFile(fileSystem, path, 'New Rich Text Document.rtf')}>Rich Text Document</Item>
            <Item onClick={() => createNewFile(fileSystem, path, 'New Text Document.txt')}>Text Document</Item>
            <Item onClick={() => createNewFile(fileSystem, path, 'New Wave Sound.wav')}>Wave Sound</Item>
            <Item onClick={() => createNewFolder(fileSystem, path, 'New Compressed Folder.zip')}>Compressed (zipped) Folder</Item>
        </Fragment>
    );
}

export const FolderContextMenu = ({id, path}: {id: string, path: string}) => (
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
            <CreateNewItems path={path} />
        </Submenu>
        <Item>Properties</Item>
    </Menu>
);