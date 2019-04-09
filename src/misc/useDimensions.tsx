import { useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
import { Size } from './Size';

export function useDimensions(): [MutableRefObject<HTMLDivElement | null>, Size] {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        setSize(ref.current!.getBoundingClientRect());

        const listener = () => setSize(ref.current!.getBoundingClientRect());
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [ref.current]);

    return [ref, size];
}