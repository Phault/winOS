import React, { ReactNode } from 'react';
import './Toolbar.scss';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarSplitButton } from './ToolbarSplitButton';
import { ToolbarSeparator } from './ToolbarSeparator';

function Toolbar({children}: {children?: ReactNode}) {
    return (
        <div className="toolbar">
            {children}
        </div>
    );
};

Toolbar.Button = ToolbarButton; 
Toolbar.Dropdown = ToolbarDropdown; 
Toolbar.SplitButton = ToolbarSplitButton; 
Toolbar.Separator = ToolbarSeparator; 

export { Toolbar };