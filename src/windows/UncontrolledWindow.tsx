import React, { useState } from 'react';
import Window, { WindowProps } from './Window';
import { Rectangle } from '../misc/Rectangle';
import { Position } from '../misc/Position';

export interface UncontrolledWindowProps extends Partial<WindowProps> {
    minWidth?: number;
    minHeight?: number;
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
            onResize={onResize} />
    );
}

export default UncontrolledWindow;