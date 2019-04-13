import React, { useState, useContext, useCallback } from 'react';
import './Explorer.scss';
import { MenuBar } from '../../widgets/menubar/MenuBar';
import { Submenu, Item, Separator } from 'react-contexify';
import { FolderView, FileInfo } from '../../widgets/folderview/FolderView';
import { IconView } from '../../widgets/folderview/views/icon/IconView';
import { Toolbar } from '../../widgets/toolbar/Toolbar';
import folderUpIcon from '../../assets/icons/toolbar/folder_up.png';
import searchIcon from '../../assets/icons/toolbar/search.png';
import foldersIcon from '../../assets/icons/toolbar/folders.png';
import viewIcon from '../../assets/icons/toolbar/view.png';
import goIcon from '../../assets/icons/toolbar/go-normal.png';
import windowsIcon from '../../assets/toolbar-icon-windows.png';
import { WindowContext } from '../../windows/WindowManager';
import { AddressBar } from './AddressBar';
import { Icon } from '../../widgets/Icon';
import { NavigationHistory } from './NavigationHistory';
import { Observer, useObserver } from 'mobx-react-lite';
import * as nodePath from 'bfs-path';
import { NavigationHistoryButtons } from './NavigationHistoryButtons';
import { OSContext } from '../../App';
import { CreateNewItems } from '../../widgets/folderview/FolderContextMenu';
import { KeyMap } from 'react-hotkeys';
import { getIcon } from '../../misc/fileUtils';
import { ExplorerApp } from './ExplorerApp';

function ViewModeItems() {
    return (
        <React.Fragment>
            {/* only if dir contains images */}
            {/* <Item>Filmstrip</Item> */}

            <Item>Thumbnails</Item>
            <Item>Tiles</Item>
            <Item>Icons</Item>
            <Item>List</Item>
            <Item>Details</Item>
        </React.Fragment>
    );
}

const ExplorerKeyMap: KeyMap = {
    SEARCH: ['ctrl+f', 'ctrl+e', 'f3'],
    FAVORITES: 'ctrl+i',
    HISTORY: 'ctrl+h',
    BACK: ['alt+left', 'backspace'],
    FORWARD: 'alt+right',
    CLOSE: 'ctrl+w',
    FOCUS_ADDRESSBAR: 'f4'
}

interface ExplorerProps {
    initialDir: string;
}


const Explorer: React.FC<ExplorerProps> = ({initialDir}) => {
    const [history] = useState(() => new NavigationHistory(initialDir));
    const window = useContext(WindowContext)!;
    const {processManager, programManager, fileSystem} = useContext(OSContext)!;

    useObserver(() => {
        const stats = fileSystem.statSync(history.current);
        window.icon = getIcon({
            path: history.current,
            stats
        });
        window.title = nodePath.basename(history.current) || ExplorerApp.name;
    });

    const handleFileExecution = useCallback((files: FileInfo[]) => {
        const file = files[0];
        const fullPath = nodePath.isAbsolute(file.path) ? file.path : nodePath.join(history.current, file.path);

        if (file.stats.isFile()) {
            const apps = programManager.getInstalledForExtension(nodePath.extname(fullPath));
            if (apps.length > 0)
                processManager.run(apps[0], fullPath);
        }
        else if (fullPath !== history.current)
            history.push(fullPath);
    }, [history, processManager]);

    const goUp = useCallback(() => {
        const parentDir = nodePath.normalize(nodePath.join(history.current, '..'));
        if (parentDir !== history.current)
            history.push(parentDir);
    }, [history]);

    return (
        <div className="explorer">
            <div className="header">
                <Toolbar>
                    <MenuBar>
                        <MenuBar.Menu label="File">
                            <Submenu label="New">
                                <CreateNewItems path={history.current} />
                            </Submenu>
                            <Separator />
                            <Item disabled>Create Shortcut</Item>
                            <Item disabled>Delete</Item>
                            <Item disabled>Rename</Item>
                            <Item disabled>Properties</Item>
                            <Separator />
                            <Item onClick={() => window.destroy()}>Close</Item>
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
                    <div className="explorer-windows-icon">
                        <Icon src={windowsIcon}/>
                    </div>
                </Toolbar>

                <Toolbar>
                    <NavigationHistoryButtons history={history} />

                    <Toolbar.Button icon={folderUpIcon} onClick={goUp} />
                    <Toolbar.Separator />
                    <Toolbar.Button icon={searchIcon} onClick={() => console.log('search')}>Search</Toolbar.Button>
                    <Toolbar.Button icon={foldersIcon} onClick={() => console.log('folders')}>Folders</Toolbar.Button>
                    <Toolbar.Separator />
                    <Toolbar.Dropdown icon={viewIcon}>
                        <ViewModeItems />
                    </Toolbar.Dropdown>   
                </Toolbar>

                <Toolbar>
                    <span style={{padding: '0 4px 0 5px', color: '#7f7c73'}}>Address</span>
                    <Observer>
                        {() => <AddressBar onChange={newValue => handleFileExecution([{path: newValue, stats: fileSystem.statSync(newValue)}])} value={history.current} />}
                    </Observer>
                    <Toolbar.Button icon={goIcon} className="toolbar-button-go">
                        Go
                    </Toolbar.Button>
                </Toolbar>
            </div>

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
                    <Observer>
                        {() => <FolderView path={history.current} viewMode={IconView} onExecute={handleFileExecution} />}
                    </Observer>
                </div>
            </div>
        </div>
    )
};

export { Explorer };