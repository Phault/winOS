import React, { useState, useEffect, useCallback } from 'react';
import { Window, WindowProps } from './Window';
import { Rectangle } from '../misc/Rectangle';
import { Position } from '../misc/Position';
import { MovableProps } from '../misc/Movable';
import { ResizableProps } from '../misc/Resizable';

export interface UncontrolledWindowProps extends Partial<WindowProps & ResizableProps & MovableProps> {}

const UncontrolledWindow: React.FC<UncontrolledWindowProps> = (props) => {
    const [rect, setRect] = useState<Rectangle>({
        left: props.left || 0,
        top: props.top || 0,
        width: props.width || 0,
        height: props.height || 0
    });

    useEffect(() => {
        const {left, top, width, height} = props;
        
        setRect({
            left: left !== undefined ? left : rect.left,
            top: top !== undefined ? top : rect.top,
            width: width !== undefined ? width : rect.width,
            height: height !== undefined ? height : rect.height,
        });
    }, [props.left, props.top, props.width, props.height]);
    
    const onMove = useCallback((pos: Position) => {
        setRect({
            ...rect,
            ...pos
        });

        if (props.onMove)
            props.onMove(pos);
    }, [rect, setRect, props.onMove]);

    const onResize = useCallback((bounds: Rectangle) => { 
        setRect(bounds);

        if (props.onResize)
            props.onResize(bounds);
    }, [setRect, props.onResize]);

    return (
        <Window
            {...props}
            {...rect}
            onMove={onMove}
            onResize={onResize} />
    );
}

export { UncontrolledWindow };