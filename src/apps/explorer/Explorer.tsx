import React from 'react';
import { OS } from "../../OS";
import './Explorer.scss';
import { NotepadApp } from '../notepad/NotepadApp';
import { MenuBar } from '../framework/widgets/menubar/MenuBar';
import { Submenu, Item, Separator } from 'react-contexify';
import { FolderView } from '../framework/widgets/folderview/FolderView';
import { DetailView } from '../framework/widgets/folderview/views/DetailView';
import { IconView } from '../framework/widgets/folderview/views/icon/IconView';

interface ExplorerState {
    path: string;
    contents: string[] | null;
}

export interface ExplorerProps {
    os: OS;
}

interface FileDescriptor {
    fileName: string;
    icon?: string;
    extension: string;
    type: 'File' | 'Dir'
}

interface DirContents {

}

export class Explorer extends React.Component<ExplorerProps, ExplorerState> {
    state = {
        path: '/',
        contents: null 
    }

    componentDidMount() {
        this.fetchContents(this.state.path);
    }

    fetchContents(path: string) {
        this.setState({
            path,
            contents: null
        });

        this.props.os.fileSystem.readdir(path, (e, contents) => {
            if (!e)
                this.setState({ contents: contents || null });
        });
    }

    handleFileDoubleClick(file: string) {
        // todo: replace all this nonsense
        if (file.includes('.'))
            NotepadApp.run(this.props.os, this.state.path + '/' + file);
        else
            this.fetchContents(file);
    }

    render() {
        const files = (this.state.contents || []).map((file, i) => (
            <li key={i} 
                onDoubleClick={() => this.handleFileDoubleClick(file)}>
                {file}
            </li>
        ));

        return (
            <div className="explorer">
                <MenuBar id="explorer">
                    <MenuBar.Menu label="File">
                        <Submenu label="New">
                            <Item>Folder</Item>
                            <Item>Shortcut</Item>
                            <Separator />
                            <Item>Briefcase</Item>
                            <Item>Bitmap Image</Item>
                            <Item>Wordpad Document</Item>
                            <Item>Rich Text Document</Item>
                            <Item>Text Document</Item>
                            <Item>Wave Sound</Item>
                            <Item>Compressed (zipped) Folder</Item>
                        </Submenu>
                        <Separator />
                        <Item disabled>Create Shortcut</Item>
                        <Item disabled>Delete</Item>
                        <Item disabled>Rename</Item>
                        <Item disabled>Properties</Item>
                        <Separator />
                        <Item>Close</Item>
                    </MenuBar.Menu>
                    <MenuBar.Menu label="Edit">
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
                    </MenuBar.Menu>
                    <MenuBar.Menu label="View">
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
                        <Item>Thumbnails</Item>
                        <Item>Tiles</Item>
                        <Item>Icons</Item>
                        <Item>List</Item>
                        <Item>Details</Item>
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
                    </MenuBar.Menu>
                    <MenuBar.Menu label="Favorites">
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
                    </MenuBar.Menu>
                    <MenuBar.Menu label="Tools">
                        <Item>Map Network Drive...</Item>
                        <Item>Disconnect Network Drive...</Item>
                        <Item>Synchronize...</Item>
                        <Separator />
                        <Item>Folder Options...</Item>
                    </MenuBar.Menu>
                    <MenuBar.Menu label="Help">
                        <Item>Help and Support Center</Item>
                        <Separator />
                        <Item>Is this copy of Windows legal?</Item>
                        <Item>About Windows</Item>
                    </MenuBar.Menu>
                </MenuBar>
                <div className="toolbar">{this.state.path}</div>
                <div className="body">
                    <div className="sidebar">
                        <div className="group">
                            <div className="group-header">File and Folder Tasks</div>
                            <div className="group-body">
                                <ul>
                                    <li>Make a new folder</li>
                                    <li>Publish this folder to the Web</li>
                                    <li>Share this folder</li>
                                </ul>
                            </div>
                        </div>
                        <div className="group">
                            <div className="group-header">Other Places</div>
                            <div className="group-body">
                                <ul>
                                    <li>Desktop</li>
                                    <li>Shared Documents</li>
                                    <li>My Computer</li>
                                    <li>My Network</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="contents">
                        <FolderView path={this.state.path} viewMode={IconView} />
                        {/* <ul>
                            {files}
                        </ul> */}
                    </div>
                </div>
            </div>
        )
    }
}

