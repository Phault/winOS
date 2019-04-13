import React, { ButtonHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import classNames from 'classnames';

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, className, children, ...rest }) => (
    <button className={classNames("toolbar-button", className)} {...rest}>
        {icon && <Icon src={icon} />}
        <div>{children}</div>
    </button>
);
