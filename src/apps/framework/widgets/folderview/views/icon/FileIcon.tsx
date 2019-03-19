import React from 'react';
import Truncate from 'react-truncate';
import './FileIcon.scss';

interface FileIconProps {
    icon?: string;
    children?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ icon, children }) => {
    return (
        <div className="file-icon">
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
