import React, { useState, useEffect, useContext, Fragment, CSSProperties } from 'react';
import { OSContext } from '../../../../App';
import Stats from 'browserfs/dist/node/core/node_fs_stats';
import { FolderContextMenu } from './FolderContextMenu';
import { useUuid } from '../../../../misc/useUuid';
import { MenuProvider } from 'react-contexify';
import './FolderView.scss';
import * as nodePath from 'bfs-path';

export type ExecuteHandler = (items: string[]) => void;

export interface ViewModeProps {
    files: FileInfo[];
    onExecute?: ExecuteHandler;
}

export interface FolderViewProps {
    path: string;
    viewMode: React.ComponentType<ViewModeProps>,
    onSelectionChanged?: (items: string[]) => void;
    onExecute?: ExecuteHandler;

    className?: string;
    style?: CSSProperties;
}

const FolderView: React.FC<FolderViewProps> = ({path, viewMode: ViewMode, onExecute, onSelectionChanged}) => {
    const [contents, setContents] = useState<FileInfo[] | null>(null);
    const [selection, setSelection] = useState<string[]>([]);

    const contextMenuId = useUuid();

    const {fileSystem} = useContext(OSContext)!;
    
    function loadContents(path: string) {
        fileSystem.readdir(path, (e, files) => {
            const fileInfos = (files || []).map(file => ({
                path: file,
                stats: fileSystem.statSync(nodePath.join(path, file))
            }));
            setContents(fileInfos);
            setSelection([]);
        });
    }

    useEffect(() => loadContents(path), [path]);

    return (
        <Fragment>
            <MenuProvider id={contextMenuId} className="folder-view" storeRef={false}>
                <ViewMode files={contents!} onExecute={onExecute} />
            </MenuProvider>
            <FolderContextMenu id={contextMenuId}/>
        </Fragment>
    );
};

export interface FileInfo {
    path: string;
    stats: Stats;
}

interface ShortcutInfo {
    targetType: string; // application, website, email??
    targetLocation: string; // ?
    target: string; // path to executable, website?
    workingDir: string;
    shortcutKey: string; // ???
    run: any; // normal, minimized, maximized
    comment: string;
    runWithCredentials: any;

    // icon is changeable and not bound to target
}

export { FolderView };