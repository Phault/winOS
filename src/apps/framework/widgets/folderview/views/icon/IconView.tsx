import React from 'react';
import { FileInfo } from '../../FolderView';
import { FileIcon } from './FileIcon';
import './IconView.scss';

const IconView: React.FC<{files: FileInfo[]}> = (props) => {
    return (
        <div className="folderview-icons">
            {(props.files || []).map(f => <FileIcon>{f.fullPath}</FileIcon>)}
        </div>
    )
};

export { IconView };