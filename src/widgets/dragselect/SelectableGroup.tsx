import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
  RefObject,
  Ref
} from 'react';
import { Position } from '../../misc/Position';
import { usePointerCapture } from '../../misc/hooks/usePointerCapture';
import { SelectionBox } from './SelectionBox';
import { checkCollision } from './checkCollision';
import { Selection, SelectionContext } from './Selection';

export interface SelectableWrappedRequiredProps {
  ref: Ref<HTMLDivElement> | undefined | null;
  onPointerDown: React.PointerEventHandler<HTMLElement>;
  onPointerMove: React.PointerEventHandler<HTMLElement>;
  onPointerUp: React.PointerEventHandler<HTMLElement>;
}

export interface SelectableGroupProps {
  component?: React.ElementType<SelectableWrappedRequiredProps>;
}

export const SelectableGroup: FC<SelectableGroupProps> = ({
  component: Component = 'div',
  children,
  ...rest
}) => {
  const [context] = useState(() => new Selection());
  const [ref, pointerId, setPointerId] = usePointerCapture<HTMLDivElement>();
  const [start, setStart] = useState<Position | null>(null);
  const [stop, setStop] = useState<Position | null>(null);

  const rect = useMemo(() => {
    if (!start || !stop || !ref.current) return null;

    const left = Math.max(0, Math.min(start.left, stop.left));
    const top = Math.max(0, Math.min(start.top, stop.top));
    const right = Math.min(
      ref.current.scrollWidth,
      Math.max(start.left, stop.left)
    );
    const bottom = Math.min(
      ref.current.scrollHeight,
      Math.max(start.top, stop.top)
    );

    return {
      left,
      top,
      width: right - left,
      height: bottom - top
    };
  }, [start, stop]);

  const recheckCollisions = useCallback(() => {
    if (!rect) return;

    const collisions = checkCollision(ref.current!, context.items.keys(), rect);
    context.setSelection(collisions);
  }, [rect, context, ref]);

  useEffect(recheckCollisions, [recheckCollisions]);

  useEffect(() => {
    const handler = recheckCollisions;

    context.onItemRegistered.register(handler);
    return () => context.onItemRegistered.unregister(handler);
  }, [context, recheckCollisions]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const bounds = ref.current!.getBoundingClientRect();

      const pos = {
        left: e.clientX - bounds.left + ref.current!.scrollLeft,
        top: e.clientY - bounds.top + ref.current!.scrollTop
      };

      setStart(pos);
      setStop(pos);

      setPointerId(e.pointerId);

      e.stopPropagation();
    },
    [setStart, setStop, setPointerId]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (pointerId !== e.pointerId) return;

      const bounds = ref.current!.getBoundingClientRect();

      setStop({
        left: e.clientX - bounds.left + ref.current!.scrollLeft,
        top: e.clientY - bounds.top + ref.current!.scrollTop
      });

      e.stopPropagation();
    },
    [pointerId, setStop]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerId !== e.pointerId) return;

      setStart(null);
      setStop(null);
      setPointerId(null);

      e.stopPropagation();
    },
    [setStart, setStop, pointerId, setPointerId]
  );

  return (
    <SelectionContext.Provider value={context}>
      <Component
        {...rest}
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}>
        {children}
        {rect && <SelectionBox rect={rect} />}
      </Component>
    </SelectionContext.Provider>
  );
};

export function asSelectableGroup<P>(
  WrappedComponent: React.ComponentType<P>,
  component?: React.ComponentType<SelectableWrappedRequiredProps>
): FC<P> {
  return props => (
    <SelectableGroup component={component}>
      <WrappedComponent {...props} />
    </SelectableGroup>
  );
}
