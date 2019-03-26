import React from 'react';
import Truncate from 'react-truncate';
import './FileIcon.scss';

interface FileIconProps {
    icon?: string;
    children?: string;
    onDoubleClick: (e: React.MouseEvent) => void;
}

const FileIcon: React.FC<FileIconProps> = ({ icon, children, ...rest }) => {
    return (
        <div className="file-icon" {...rest}>
            <img src={icon} draggable={false} />
            <div className="label">
                <Truncate lines={2}>
                    {children}
                </Truncate>
            </div>
        </div>
    );
}

export { FileIcon };
