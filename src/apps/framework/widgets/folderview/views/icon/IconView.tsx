import React from 'react';
import { ViewModeProps, FileInfo } from '../../FolderView';
import { FileIcon } from './FileIcon';
import './IconView.scss';
import defaultIcon from '../../../../../../assets/icons/filetypes/default.png';
import folderIcon from '../../../../../../assets/icons/filetypes/folder.png';
import textIcon from '../../../../../../assets/icons/filetypes/text.png';
import musicIcon from '../../../../../../assets/icons/filetypes/music.png';
import videoIcon from '../../../../../../assets/icons/filetypes/video.png';
import * as nodePath from 'bfs-path';
import { useUuid } from '../../../../../../misc/useUuid';
import { FileContextMenu } from '../../FileContextMenu';
import { MenuProvider } from 'react-contexify';

function getIcon({path, stats}: FileInfo) {
    if (stats.isDirectory())
        return folderIcon;

    const ext = nodePath.extname(path);

    switch (ext) {
        case '.txt': return textIcon;
        case '.wav':
        case '.mp3': return musicIcon;
        case '.avi':
        case '.mov':
        case '.mp4': return videoIcon;
    }

    return defaultIcon;
}

const IconView: React.FC<ViewModeProps> = ({ files, onExecute}) => {
    const fileContextMenuId = useUuid();

    function onFileDoubleClick(file: FileInfo) {
        if (onExecute)
            onExecute([file.path]);
    }

    return (
        <div className="folderview-icons">
            {(files || []).map(f => (
                <MenuProvider id={fileContextMenuId} key={f.path} storeRef={false}>
                    <FileIcon icon={getIcon(f)} onDoubleClick={() => onFileDoubleClick(f)}>
                        {f.path}
                    </FileIcon>
                </MenuProvider>
            ))}
            <FileContextMenu id={fileContextMenuId} />
        </div>
    );
};

export { IconView };