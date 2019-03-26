import React, { useState, useEffect, useContext } from 'react';
import { FileSystemContext } from '../../../../App';

export type ExecuteHandler = (items: string[]) => void;

export interface ViewModeProps {
    files: FileInfo[];
    onExecute?: ExecuteHandler;
}

interface FolderViewProps {
    path: string;
    viewMode: React.ComponentType<ViewModeProps>,
    onSelectionChanged?: (items: string[]) => void;
    onExecute?: ExecuteHandler;
}

const FolderView: React.FC<FolderViewProps> = ({path, viewMode: ViewMode, onExecute}) => {
    const [contents, setContents] = useState<FileInfo[] | null>(null);
    const [selection, setSelection] = useState<string[]>([]);

    const fileSystem = useContext(FileSystemContext);
    
    function loadContents(path: string) {
        fileSystem!.readdir(path, (e, files) => {
            const fileInfos = (files || []).map(file => ({
                fullPath: file
            }));
            setContents(fileInfos);
            setSelection([]);
        });
    }

    useEffect(() => loadContents(path), [path]);

    return (
        <ViewMode files={contents!} onExecute={onExecute}/>
    );
};

export interface FileInfo {
    //icon: string; // ? associated app? remove and move responsible elsewhere
    fullPath: string;
    //extension: string; // could be method
    //fileName: string; // could be method

    // attributes??
    // lastModified: string; // what's the type for datetimes?
    // created: string;
    // accessed: string;

    // readonly: boolean;
    // hidden: boolean;
    // owner: string;
    // group: string; // ?
    // permissions: number;

    // size: number; // ?
    // sizeOnDisk: number; // ?
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