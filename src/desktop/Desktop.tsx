import React, { useState, useCallback, useContext } from 'react';
import { FolderView } from '../apps/framework/widgets/folderview/FolderView';
import { IconView } from '../apps/framework/widgets/folderview/views/icon/IconView';
import './Desktop.scss';
import { OSContext } from '../App';
import * as nodePath from 'bfs-path';
import { NotepadApp } from '../apps/notepad';
import { ExplorerApp } from '../apps/explorer';
import { WindowRenderer } from '../windows/WindowRenderer';

function Desktop({path}: {path: string}) {
    const {processManager} = useContext(OSContext)!;

    // todo: deduplicate
    const handleFileExecution = useCallback((files: string[]) => {
        const file = files[0];
        const fullPath = nodePath.isAbsolute(file) ? file : nodePath.join(path, file);
        const extension = nodePath.extname(file);

        if (extension)
            processManager.run(NotepadApp, fullPath);
        else
            processManager.run(ExplorerApp, fullPath);
    }, [processManager, path]);

    return (
        <div className="desktop">
            <FolderView viewMode={IconView} path='/' onExecute={handleFileExecution} />
        </div>
    );
}

export default Desktop;