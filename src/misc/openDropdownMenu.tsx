import React from 'react';
import { eventManager } from 'react-contexify/lib/utils/eventManager';
import { DISPLAY_MENU } from 'react-contexify/lib/utils/actions';
export function openDropdownMenu(id: string, event: React.MouseEvent) {
    const buttonRect = (event.target as Element).getBoundingClientRect();
    event.clientX = buttonRect.left;
    event.clientY = buttonRect.top + buttonRect.height - 1;
    // we can't use contextMenu.show() as it uses nativeEvent which we can't mutate
    eventManager.emit(DISPLAY_MENU(id), event);
}
