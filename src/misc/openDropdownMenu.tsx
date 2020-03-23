import React from 'react';
import { eventManager } from 'react-contexify/lib/utils/eventManager';
import { DISPLAY_MENU } from 'react-contexify/lib/utils/actions';

export interface Anchor {
  x: number;
  y: number;
}

export const Anchors: Readonly<{ [key: string]: Anchor }> = {
  Center: { x: 0.5, y: 0.5 },
  TopLeft: { x: 0, y: 0 },
  TopRight: { x: 1, y: 0 },
  BottomRight: { x: 1, y: 1 },
  BottomLeft: { x: 0, y: 1 },
};

export function openDropdownMenu(
  id: string,
  event: React.MouseEvent,
  anchor: Anchor = Anchors.BottomLeft
) {
  const buttonRect = (event.currentTarget as Element).getBoundingClientRect();
  event.clientX = buttonRect.left + buttonRect.width * anchor.x;
  event.clientY = buttonRect.top + buttonRect.height * anchor.y - 1;

  // we can't use contextMenu.show() as it uses nativeEvent which we can't mutate
  eventManager.emit(DISPLAY_MENU(id), event);
}
