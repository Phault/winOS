import React, { ReactNode, useState, ReactElement, DOMAttributes } from 'react';
import './MenuBar.scss';
import { Menu } from 'react-contexify';
import classNames from 'classnames';
import { useUuid } from '../../../../misc/useUuid';
import { openDropdownMenu } from '../../../../misc/openDropdownMenu';

interface MenuBarProps {
    children: ReactElement<MenuProps & DOMAttributes<any>>[] | ReactElement<MenuProps & DOMAttributes<any>>
}

function MenuBar(props: MenuBarProps) {
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

    const childrenWithProps = React.Children.map(props.children, (child) => {
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

    return (
        <div className="menu-bar">
            {childrenWithProps}
        </div>
    );
}

interface MenuProps {
    label: string;
    id?: string;
    active?: boolean;
    children: ReactNode;
    onMenuHidden?: () => void;
}

const MenuBarMenu: React.FC<MenuProps> = ({active, label, id, children, onMenuHidden, ...rest}) => {
    return (
        <React.Fragment>
            <div className={classNames({
                    "menu-bar-menu": true,
                    "active": !!active
                })}
                {...rest}>
                {label}
            </div>
            <Menu id={id || label} onHidden={onMenuHidden}>
                {children || <div />}
            </Menu>
        </React.Fragment>
    );
}

MenuBar.Menu = MenuBarMenu;

export { MenuBar };