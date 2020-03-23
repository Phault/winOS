import React, { useEffect, useState, useCallback } from 'react';
import { Rectangle } from './Rectangle';
import { Direction } from './Direction';
import { usePointerCapture } from './hooks/usePointerCapture';
import { createGlobalStyle } from 'styled-components';
import { GlobalIframePointerPassthrough } from './GlobalIframePointerPassthrough';

function mapDirectionToCursor(dir: Direction) {
  if (dir === Direction.None) return 'auto';

  var dirs = '';

  if ((dir & Direction.North) == Direction.North) dirs += 'n';
  else if ((dir & Direction.South) == Direction.South) dirs += 's';

  if ((dir & Direction.West) == Direction.West) dirs += 'w';
  else if ((dir & Direction.East) == Direction.East) dirs += 'e';

  return dirs + '-resize';
}

const CursorStyle = createGlobalStyle<{ direction: Direction }>`
    body * {
        cursor: ${props => mapDirectionToCursor(props.direction)} !important;
    }
`;

export interface WrappedResizableProps extends Partial<Rectangle> {
  isResizing?: boolean;
}

export interface ResizableProps extends Rectangle {
  onResize: (bounds: Rectangle) => void;
  border?: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
}

export default function asResizable<P extends WrappedResizableProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & ResizableProps> {
  return function Resizable(props) {
    const [ref, pointerId, setCapturedPointer] = usePointerCapture<
      HTMLDivElement
    >();
    const [resizeDir, setResizeDir] = useState(Direction.None);

    const ensureMinSize = () => {
      const minWidth = props.minWidth || 0;
      const minHeight = props.minHeight || 0;

      if (props.width < minWidth || props.height < minHeight) {
        props.onResize({
          left: props.left,
          top: props.top,
          width: Math.max(props.width, minWidth),
          height: Math.max(props.height, minHeight),
        });
      }
    };
    useEffect(ensureMinSize, [
      props.minWidth,
      props.minHeight,
      props.width,
      props.height,
    ]);

    const getResizeDir = useCallback(
      (e: React.PointerEvent) => {
        const border = props.border || 5;

        let dir: Direction = Direction.None;

        if (!ref.current!.contains(e.target as Node)) return dir;

        if (e.clientY - props.top < border) dir |= Direction.North;
        else if (props.top + props.height - e.clientY < border)
          dir |= Direction.South;

        if (e.clientX - props.left < border) dir |= Direction.West;
        else if (props.left + props.width - e.clientX < border)
          dir |= Direction.East;

        return dir;
      },
      [
        props.border,
        ref.current,
        props.top,
        props.left,
        props.width,
        props.height,
      ]
    );

    const updateCursor = useCallback(
      (e: React.PointerEvent) => {
        if (pointerId === null) setResizeDir(getResizeDir(e));
      },
      [pointerId, setResizeDir, getResizeDir]
    );

    const onMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (pointerId === null || e.pressure === 0) {
          setCapturedPointer(null);
          updateCursor(e);
          return;
        }

        const minWidth = props.minWidth || 0;
        const minHeight = props.minHeight || 0;

        let rect = {
          top: props.top,
          left: props.left,
          right: props.left + props.width,
          bottom: props.top + props.height,
        };

        if ((resizeDir & Direction.North) === Direction.North)
          rect.top = Math.min(rect.bottom - minHeight, e.clientY);
        else if ((resizeDir & Direction.South) === Direction.South)
          rect.bottom = Math.max(rect.top + minHeight, e.clientY);

        if ((resizeDir & Direction.West) === Direction.West)
          rect.left = Math.min(rect.right - minWidth, e.clientX);
        else if ((resizeDir & Direction.East) === Direction.East)
          rect.right = Math.max(rect.left + minWidth, e.clientX);

        props.onResize({
          top: rect.top,
          left: rect.left,
          width: rect.right - rect.left,
          height: rect.bottom - rect.top,
        });

        e.stopPropagation();
      },
      [
        pointerId,
        setCapturedPointer,
        updateCursor,
        resizeDir,
        props.minWidth,
        props.minHeight,
        props.top,
        props.left,
        props.width,
        props.height,
        props.onResize,
      ]
    );

    const onLeave = useCallback(() => {
      if (pointerId === null) setResizeDir(Direction.None);
    }, [pointerId, setResizeDir]);

    const onDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;

        const dir = getResizeDir(e);

        if (dir === Direction.None) return;

        setCapturedPointer(e.pointerId);
        setResizeDir(dir);

        e.preventDefault();
        e.stopPropagation();
      },
      [getResizeDir, setCapturedPointer, setResizeDir]
    );

    const onUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (pointerId === null) return;

        setCapturedPointer(null);

        e.preventDefault();
        e.stopPropagation();
      },
      [pointerId, setCapturedPointer, updateCursor]
    );

    return (
      <div
        ref={ref}
        touch-action="none"
        onPointerEnter={props.resizable ? updateCursor : undefined}
        onPointerDown={props.resizable ? onDown : undefined}
        onPointerMove={props.resizable ? onMove : undefined}
        onPointerUp={props.resizable ? onUp : undefined}
        onPointerLeave={props.resizable ? onLeave : undefined}>
        {pointerId !== null && <GlobalIframePointerPassthrough />}
        {resizeDir !== Direction.None && <CursorStyle direction={resizeDir} />}
        <WrappedComponent {...props} isResizing={pointerId !== null} />
      </div>
    );
  };
}
