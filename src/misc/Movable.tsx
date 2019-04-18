import React, { useState, useRef } from 'react';
import { Position } from './Position';
import { Rectangle } from './Rectangle';
import { usePointerCapture } from './usePointerCapture';

export interface WrappedMovableProps extends Partial<Position> {
    handle?: React.Ref<HTMLDivElement>;
}

export interface MovableProps extends Position {
    onMove: (pos: Position) => void;
}

function InsideRectangle(rect: Rectangle, x: number, y: number) {
    if (x < rect.left || y < rect.top)
        return false;

    if (x > rect.left + rect.width || y > rect.top + rect.height)
        return false;

    return true;
}

export default function asMovable<P extends WrappedMovableProps>(WrappedComponent: React.ComponentType<P>): React.FC<P & MovableProps> {
    return function Movable(props) {
        const [ref, pointerId, setCapturedPointer] = usePointerCapture<HTMLDivElement>();
        const [anchor, setAnchor] = useState<Position | null>(null);

        const handleRef = useRef<HTMLDivElement>(null);

        const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
            if (pointerId === null)
                return;

            props.onMove({
                left: e.clientX - anchor!.left,
                top: e.clientY - anchor!.top
            })

            e.stopPropagation();
        }

        const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
            if (handleRef.current && !InsideRectangle(handleRef.current.getBoundingClientRect(), e.clientX, e.clientY))
                return;

            setAnchor({
                left: e.clientX - props.left,
                top: e.clientY - props.top
            });

            setCapturedPointer(e.pointerId!);

            e.stopPropagation();
        }

        const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
            if (pointerId === null)
                return;

            setCapturedPointer(null);
            setAnchor(null);
            e.stopPropagation();
        }

        return (
            <div
                ref={ref}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}>
                <WrappedComponent
                    {...props}
                    handle={handleRef} />
            </div>
        );
    }
}