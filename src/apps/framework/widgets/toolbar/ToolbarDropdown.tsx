import React, { ReactElement, DOMAttributes, Ref, RefObject } from 'react';
import { Icon } from '../Icon';
import dropdownGlyph from '../../../../assets/toolbar-dropdown-glyph.png';
import { Menu } from 'react-contexify';
import { MenuProps } from 'react-contexify/lib/components/Menu';
import { useUuid } from '../../../../misc/useUuid';
import { openDropdownMenu, Anchor } from '../../../../misc/openDropdownMenu';
import { ToolbarButtonProps, ToolbarButton } from './ToolbarButton';

export interface ToolbarDropdownProps extends ToolbarButtonProps {
    label?: string;
    children: ReactElement<MenuProps & DOMAttributes<any>>[] | ReactElement<MenuProps & DOMAttributes<any>>;
    dropdownAnchor?: Anchor,
    dropdownParent?: RefObject<HTMLElement>
}

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = ({ label, children, dropdownAnchor, dropdownParent, ...rest }) => {
    const menuId = useUuid();

    function onClicked(e: React.MouseEvent) {
        if (dropdownParent && dropdownParent.current)
            e.currentTarget = dropdownParent.current;

        openDropdownMenu(menuId, e, dropdownAnchor);
    }

    return (
        <React.Fragment>
            <ToolbarButton {...rest} onClick={onClicked}>
                {label}
                <Icon src={dropdownGlyph} width={5} height={3} />
            </ToolbarButton>

            <Menu id={menuId}>
                {children}
            </Menu>
        </React.Fragment>
    );
};
