import React, { ReactElement, DOMAttributes, Ref, RefObject, ReactNodeArray, ReactNode } from 'react';
import { Icon } from '../Icon';
import dropdownGlyph from '../../../../assets/toolbar-dropdown-glyph.png';
import { Menu } from 'react-contexify';
import { useUuid } from '../../../../misc/useUuid';
import { openDropdownMenu, Anchor } from '../../../../misc/openDropdownMenu';
import { ToolbarButtonProps, ToolbarButton } from './ToolbarButton';

export interface ToolbarDropdownProps extends ToolbarButtonProps {
    label?: string;
    children: ReactNode;
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
                <Icon src={dropdownGlyph} />
            </ToolbarButton>

            <Menu id={menuId}>
                {children}
            </Menu>
        </React.Fragment>
    );
};
