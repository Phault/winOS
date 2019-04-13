import React, { HTMLProps } from 'react';
import Truncate from 'react-truncate';
import './FileIcon.scss';
import classNames from 'classnames';

interface FileIconProps extends HTMLProps<HTMLDivElement> {
    icon?: string;
    children?: string;
    active?: boolean;
    focus?: boolean;
}

const FileIcon: React.FC<FileIconProps> = ({ icon, children, className, active, focus, ...rest }) => {
    return (
        <div className={classNames("file-icon", className, {active, focus})} {...rest}>
            <img src={icon} draggable={false} />
            <div className="label">
                <Truncate lines={2}>
                    {children}
                </Truncate>
            </div>
        </div>
    );
};

export { FileIcon };
