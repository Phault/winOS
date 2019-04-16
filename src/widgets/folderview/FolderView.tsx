import React, { useState, useEffect, useContext, Fragment, CSSProperties } from 'react';
import { OSContext } from '../../App';
import Stats from 'browserfs/dist/node/core/node_fs_stats';
import { FolderContextMenu } from './FolderContextMenu';
import { useUuid } from '../../misc/useUuid';
import { MenuProvider } from 'react-contexify';
import './FolderView.scss';
import * as nodePath from 'bfs-path';
import { HotKeys, KeyMap, KeySequence } from 'react-hotkeys';
import { ItemSelection } from "../../misc/ItemSelection";
import { rimraf } from '../../misc/rimraf';

export type ExecuteHandler = (items: FileInfo[]) => void;

export interface ViewModeProps {
    files: FileInfo[];
    onExecute: ExecuteHandler;
    selection: ItemSelection<number>;
}

export interface FolderViewProps {
    path: string;
    viewMode: React.ComponentType<ViewModeProps>,
    onExecute?: ExecuteHandler;

    className?: string;
    style?: CSSProperties;
}

export interface CursorMovementKeyMap extends KeyMap {
    CURSOR_MOVE_UP: KeySequence,
    CURSOR_MOVE_DOWN: KeySequence,
    CURSOR_MOVE_LEFT: KeySequence,
    CURSOR_MOVE_RIGHT: KeySequence,
    CURSOR_EXPAND_UP: KeySequence,
    CURSOR_EXPAND_DOWN: KeySequence,
    CURSOR_EXPAND_LEFT: KeySequence,
    CURSOR_EXPAND_RIGHT: KeySequence,
}

export type KeyHandlers<T extends {[key: string]: any} = any> = { [key in keyof Partial<T>]: (keyEvent?: KeyboardEvent) => void }

const keyMap: CursorMovementKeyMap = {
    DELETE: 'del',
    RENAME: 'f2',
    REFRESH: 'f5',
    UNDO: 'ctrl+z',
    REDO: 'ctrl+y',
    COPY: 'ctrl+c',
    CUT: 'ctrl+x',
    PASTE: 'ctrl+v',
    SELECT_ALL: 'ctrl+a',
    EXECUTE: 'enter',
    CANCEL: 'esc',
    CURSOR_MOVE_UP: 'up',
    CURSOR_MOVE_DOWN: 'down',
    CURSOR_MOVE_LEFT: 'left',
    CURSOR_MOVE_RIGHT: 'right',
    CURSOR_EXPAND_UP: 'shift+up',
    CURSOR_EXPAND_DOWN: 'shift+down',
    CURSOR_EXPAND_LEFT: 'shift+left',
    CURSOR_EXPAND_RIGHT: 'shift+right',
}

const FolderView: React.FC<FolderViewProps> = ({path, viewMode: ViewMode, onExecute}) => {
    const [contents, setContents] = useState<FileInfo[] | null>(null);
    const [selection] = useState(new ItemSelection<number>());

    const contextMenuId = useUuid();

    const {fileSystem} = useContext(OSContext)!;
    
    function loadContents(path: string) {
        const files = fileSystem.readdirSync(path);
        const fileInfos = (files || []).map(file => ({
            path: file,
            stats: fileSystem.statSync(nodePath.join(path, file))
        }));
        setContents(fileInfos);
        selection.clear();
    }

    useEffect(() => loadContents(path), [path]);

    function deleteSelection() {
        const files = selection.current.map(i => contents![i]);
        for (const file of files) {
            const fullPath = nodePath.join(path, file.path);
            if (file.stats.isDirectory())
                rimraf(fileSystem, fullPath);
            else if (file.stats.isFile())
                fileSystem.unlinkSync(fullPath)
        }
        loadContents(path);
    }

    const keyHandlers: KeyHandlers<CursorMovementKeyMap> = {
        DELETE: deleteSelection,
        REFRESH: e => { loadContents(path); e!.preventDefault()},
        EXECUTE: () => { onExecute && selection.current.length && onExecute(selection.current.map(i => contents![i])) },
        SELECT_ALL: () => selection.set(contents!.map((_f, i) => i)),
    };

    return (
        <Fragment>
            <HotKeys keyMap={keyMap} handlers={keyHandlers} className="folder-view">
                <MenuProvider id={contextMenuId} className="folder-view" storeRef={false}>
                    <ViewMode files={contents!} onExecute={onExecute || (() => {})} selection={selection} />
                </MenuProvider>
            </HotKeys>
            
            <FolderContextMenu id={contextMenuId} path={path} />
        </Fragment>
    );
};

export interface FileInfo {
    path: string;
    stats: Stats;
}

export { FolderView };