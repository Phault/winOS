import React, { useEffect, useState } from 'react';
import { Rectangle } from './Rectangle';
import { Direction } from './Direction';
import { usePointerCapture } from './usePointerCapture';
import { useCssRule } from './useStyleSheet';

export interface WrappedResizableProps extends Partial<Rectangle> {
}

export interface ResizableProps extends Rectangle {
    onResize: (bounds: Rectangle) => void;
    border?: number;
    minWidth?: number;
    minHeight?: number;
}

function mapDirectionToCursor(dir: Direction) {
    if (dir === Direction.None)
        return 'auto';

    var dirs = '';

    if ((dir & Direction.North) == Direction.North)
        dirs += 'n';
    else if ((dir & Direction.South) == Direction.South)
        dirs += 's';

    if ((dir & Direction.West) == Direction.West)
        dirs += 'w';
    else if ((dir & Direction.East) == Direction.East)
        dirs += 'e';

    return dirs + '-resize';
}

export default function asResizable<P extends WrappedResizableProps>(WrappedComponent: React.ComponentType<P>): React.FC<P & ResizableProps> {
    return function Resizable(props) {
        const [ref, pointerId, setCapturedPointer] = usePointerCapture<HTMLDivElement>();
        const [resizeDir, setResizeDir] = useState(Direction.None);

        const [cursorStyle, setCursorStyle] = useCssRule('body *', null);

        useEffect(() => {
            ensureMinSize();
        }, [props.width, props.height]);

        const ensureMinSize = () => {
            const minWidth = props.minWidth || 0;
            const minHeight = props.minHeight || 0;

            if (props.width < minWidth || props.height < minHeight) {
                props.onResize({
                    left: props.left,
                    top: props.top,
                    width: Math.max(props.width, minWidth),    
                    height: Math.max(props.height, minHeight)
                })
            }
        }

        const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
            updateCursor(getResizeDir(e.clientX, e.clientY));
        }

        const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
            if (pointerId === null) {
                updateCursor(getResizeDir(e.clientX, e.clientY));
                return;
            }

            const minWidth = props.minWidth || 0;
            const minHeight = props.minHeight || 0;

            let rect = {
                top: props.top,
                left: props.left,
                right: props.left + props.width,
                bottom: props.top + props.height
            };

            if ((resizeDir & Direction.North) == Direction.North)
                rect.top = Math.min(rect.bottom - minHeight, e.clientY);
            else if ((resizeDir & Direction.South) == Direction.South)
                rect.bottom = Math.max(rect.top + minHeight, e.clientY);

            if ((resizeDir & Direction.West) == Direction.West)
                rect.left = Math.min(rect.right - minWidth, e.clientX);
            else if ((resizeDir & Direction.East) == Direction.East)
                rect.right = Math.max(rect.left + minWidth, e.clientX);

            props.onResize({
                top: rect.top,
                left: rect.left,
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
            });

            e.stopPropagation();
        }

        const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
            updateCursor(Direction.None);
        }

        const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
            const dir = getResizeDir(e.clientX, e.clientY);

            if (dir === Direction.None)
                return;

            setCapturedPointer(e.pointerId);
            setResizeDir(dir);

            e.preventDefault();
            e.stopPropagation();
        }

        const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
            if (pointerId === null)
                return;

            setCapturedPointer(null);

            const dir = getResizeDir(e.clientX, e.clientY);
            updateCursor(dir);

            e.preventDefault();
            e.stopPropagation();
        }

        function getResizeDir(x:number, y:number) {
            const border = props.border || 5;

            let dir: Direction = Direction.None;
            
            if (y - props.top < border)
                dir |= Direction.North;
            else if (props.top + props.height - y < border)
                dir |= Direction.South;

            if (x - props.left < border)
                dir |= Direction.West;
            else if (props.left + props.width - x < border)
                dir |= Direction.East;

            return dir;
        }

        function updateCursor(dir: Direction) {
            if (pointerId !== null)
                return;

            if (dir === Direction.None)
                setCursorStyle(null)
            else
                setCursorStyle(`cursor: ${mapDirectionToCursor(dir)} !important`);      
        }

        return (
            <div
                ref={ref}
                onPointerEnter={onEnter}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerLeave={onLeave}>
                <WrappedComponent {...props} />
            </div>
        );
    }
}