import React, { ReactNode, useState } from 'react';
import Window from './Window';
import { Rectangle } from '../misc/Rectangle';
import { Position } from '../misc/Position';

export interface UncontrolledWindowProps extends Partial<Rectangle> {
    minWidth?: number;
    minHeight?: number;
    title?: string;
    icon?: string;
    active?: boolean;
}

const UncontrolledWindow: React.FC<UncontrolledWindowProps> = (props) => {

    const [rect, setRect] = useState<Rectangle>({
        left: props.left || 0,
        top: props.top || 0,
        width: props.width || 0,
        height: props.height || 0
    });
    
    const onMove = (pos: Position) => {
        setRect({
            ...rect,
            ...pos
        });
    }

    const onResize = (bounds: Rectangle) => setRect(bounds);

    return (
        <Window
            {...props}
            {...rect}
            onMove={onMove}
            onResize={onResize}>
            {props.children}
        </Window>
    );
}

export default UncontrolledWindow;