import React, { useState, ReactElement, DOMAttributes, FC, HTMLAttributes } from 'react';
import { useUuid } from '../../misc/hooks/useUuid';
import { openDropdownMenu } from '../../misc/openDropdownMenu';
import styled from 'styled-components/macro';
import { MenuProps } from './MenuBarMenu';

export interface MenuBarProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement<MenuProps & DOMAttributes<any>>[] | ReactElement<MenuProps & DOMAttributes<any>>;
}

const MenuBarBase: FC<MenuBarProps> = ({children, ...rest}: MenuBarProps) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuId = useUuid();
    
    function mouseDown(id: string, e: React.MouseEvent) {
        if (activeMenu === id)
            return;
        
        setActiveMenu(id);
        openDropdownMenu(id, e);
    }

    function mouseOver(id: string, e: React.MouseEvent) {
        if (activeMenu !== null && activeMenu !== id) {
            setActiveMenu(id);
            openDropdownMenu(id, e);
        }
    }

    function onMenuHidden(id: string) {
        if (activeMenu === id)
            setActiveMenu(null);
    }

    const childrenWithProps = React.Children.map(children, child => {
        const id = menuId + '_' + (child.props.id || child.props.label);

        return React.cloneElement(
            child,
            {
                active: activeMenu === id,
                id,
                onMouseDown: (e: React.MouseEvent) => mouseDown(id, e),
                onMouseOver: (e: React.MouseEvent) => mouseOver(id, e),
                onClick: (e: React.MouseEvent) => e.stopPropagation(),
                onMenuHidden: () => onMenuHidden(id)
            }
        );
    });

    return <div {...rest}>{childrenWithProps}</div>;
}

export const MenuBar = styled(MenuBarBase)`
    display: flex;
    background: #ece9d8;
    border-bottom: 1px solid white;
    font-family: 'Tahoma';
    font-size: 11px;
    flex-wrap: wrap;
`;