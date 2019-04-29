import React, { useCallback, useContext, FC } from 'react';
import { FolderView, FileInfo } from '../widgets/folderview/FolderView';
import { IconView, StyledIconView } from '../widgets/folderview/views/icon/IconView';
import { OSContext } from '../App';
import * as nodePath from 'bfs-path';
import { ExplorerApp } from '../apps/explorer';
import styled from 'styled-components/macro';
import { Icon } from '../widgets/folderview/views/icon/Icon';

const StyledDesktop = styled.div`
    flex-grow: 1;
    height: 100%;

    ${StyledIconView} {
        flex-flow: column wrap;
    }

    ${Icon} {
        color: white;
        text-shadow: rgb(0, 0, 0) 1px 1px 3px;
    }
`;

export const Desktop: FC<{path: string}> = ({path}) => {
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
        <StyledDesktop>
            <FolderView viewMode={IconView} path={path} onExecute={handleFileExecution} />
        </StyledDesktop>
    );
}