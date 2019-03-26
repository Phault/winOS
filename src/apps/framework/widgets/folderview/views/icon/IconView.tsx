import React from 'react';
import { ViewModeProps, FileInfo } from '../../FolderView';
import { FileIcon } from './FileIcon';
import './IconView.scss';

const IconView: React.FC<ViewModeProps> = ({ files, onExecute}) => {

    function onFileDoubleClick(file: FileInfo) {
        if (onExecute)
            onExecute([file.fullPath]);
    }

    return (
        <div className="folderview-icons">
            {(files || []).map(f => <FileIcon key={f.fullPath} onDoubleClick={() => onFileDoubleClick(f)}>{f.fullPath}</FileIcon>)}
        </div>
    )
};

export { IconView };