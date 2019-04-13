import React, { useCallback, useContext } from 'react';
import { FolderView, FileInfo } from '../widgets/folderview/FolderView';
import { IconView } from '../widgets/folderview/views/icon/IconView';
import './Desktop.scss';
import { OSContext } from '../App';
import * as nodePath from 'bfs-path';
import { ExplorerApp } from '../apps/explorer';

function Desktop({path}: {path: string}) {
    const {processManager, programManager} = useContext(OSContext)!;

    // todo: deduplicate
    const handleFileExecution = useCallback((files: FileInfo[]) => {
        const file = files[0];
        const fullPath = nodePath.isAbsolute(file.path) ? file.path : nodePath.join(path, file.path);

        if (file.stats.isFile()) {
            const apps = programManager.getInstalledForExtension(nodePath.extname(fullPath));
            if (apps.length > 0)
                processManager.run(apps[0], fullPath);
        }
        else
            processManager.run(ExplorerApp, fullPath);
    }, [processManager, path]);

    return (
        <div className="desktop">
            <FolderView viewMode={IconView} path={path} onExecute={handleFileExecution} />
        </div>
    );
}

export default Desktop;