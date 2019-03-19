import React from 'react';
import { Menu, Separator, Item, animation } from 'react-contexify';

export function TaskBarItemMenu() {
    return (
        <Menu id={TaskBarItemMenu.Id} animation={animation.fade}>
            <Item>Restore</Item>
            <Item disabled>Move</Item>
            <Item disabled>Size</Item>
            <Item disabled>Minimize</Item>
            <Item>Maximize</Item>
            <Separator />
            <Item>Close</Item>
        </Menu>
    );
}

TaskBarItemMenu.Id = 'taskbar_item';