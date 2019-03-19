import React from 'react';
import fallbackIcon from '../assets/icons/3.png';
import { MenuProvider } from 'react-contexify';
import { TaskBarItemMenu } from "./TaskBarItemMenu";
export function TaskListItem({ active, icon, children, ...rest }: {
    active?: boolean;
    icon?: string;
    children?: any;
}) {
    return (
        <MenuProvider id={TaskBarItemMenu.Id} className={"task-list-item " + (active ? 'active' : '')} {...rest}>
            <img className="app-icon" src={icon || fallbackIcon} draggable={false} />
            <span>{children}</span>
        </MenuProvider>
    );
}
