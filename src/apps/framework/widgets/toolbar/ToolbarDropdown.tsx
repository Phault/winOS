import React, { ReactElement, DOMAttributes } from 'react';
import { Icon } from '../Icon';
import dropdownGlyph from '../../../../assets/toolbar-dropdown-glyph.png';
import { Menu } from 'react-contexify';
import { MenuProps } from 'react-contexify/lib/components/Menu';
import { useUuid } from '../../../../misc/useUuid';
import { openDropdownMenu } from '../../../../misc/openDropdownMenu';
import { ToolbarButtonProps, ToolbarButton } from './ToolbarButton';

interface ToolbarDropdownProps extends ToolbarButtonProps {
    label?: string;
    children: ReactElement<MenuProps & DOMAttributes<any>>[] | ReactElement<MenuProps & DOMAttributes<any>>;
}

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = ({ label, children, ...rest }) => {
    const menuId = useUuid();

    return (
        <React.Fragment>
            <ToolbarButton {...rest} onClick={e => openDropdownMenu(menuId, e)}>
                {label}
                <Icon src={dropdownGlyph} width={5} height={3} />
            </ToolbarButton>

            <Menu id={menuId}>
                {children}
            </Menu>
        </React.Fragment>
    );
};
