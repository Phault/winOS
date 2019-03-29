import React from 'react';
import './Toolbar.scss';
import { Icon } from '../Icon';
import classNames from 'classnames';
import dropdownGlyph from '../../../../assets/toolbar-dropdown-glyph.png';

function Toolbar({children}: {children?: any}) {
    return (
        <div className="toolbar">
            {children}
        </div>
    );
};


interface ToolbarButtonProps {
    icon?: string;
    className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({icon, className, children}) => {
    return (
        <button className={classNames("toolbar-button", className)}>
            {icon ? <Icon src={icon} width={24} height={24} /> : null }
            <div>{children}</div>
        </button>
    );
};

const ToolbarDropdown: React.FC<ToolbarButtonProps> = ({children, ...rest}) => {

    return (
        <ToolbarButton {...rest}>
            {children}
            <Icon src={dropdownGlyph} width={5} height={3} />
        </ToolbarButton>
    );
}

const ToolbarSplitButton: React.FC<ToolbarButtonProps> = ({icon, children}) => {
    return (
        <div className="toolbar-split">
            <ToolbarButton icon={icon}>{children}</ToolbarButton>
            <ToolbarDropdown />
        </div>
    );
};

const ToolbarSeparator = () => <div className="toolbar-separator" />;

Toolbar.Button = ToolbarButton; 
Toolbar.Dropdown = ToolbarDropdown; 
Toolbar.SplitButton = ToolbarSplitButton; 
Toolbar.Separator = ToolbarSeparator; 

export { Toolbar };