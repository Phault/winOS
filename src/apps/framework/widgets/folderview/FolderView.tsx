import React, { useState, useEffect } from 'react';

interface FolderViewProps {
    path: string;
    viewMode: React.ComponentType<{files: FileInfo[]}>,
    onSelectionChanged?: (items: string[]) => void;
}

const FolderView: React.FC<FolderViewProps> = (props) => {
    const [contents, setContents] = useState<FileInfo[] | null>(null);
    const [selection, setSelection] = useState<string[]>([]);
    
    function loadContents(path: string) {                                          
        setContents([{
            fullPath: '/folder/test.txt',
        }]);
        setSelection([]);
    }

    useEffect(() => {
        loadContents(props.path);
    }, [props.path]);

    return (
        <props.viewMode files={contents!}/>
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