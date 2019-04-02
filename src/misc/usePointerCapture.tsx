import { useRef, useEffect, useState, RefObject, Dispatch, SetStateAction } from 'react';

export function usePointerCapture<T extends HTMLElement>(): [RefObject<T>, number | null, Dispatch<SetStateAction<number | null>>] {
    const ref = useRef<T>(null);
    const [capturedPointer, setCapturedPointer] = useState<number | null>(null);

    useEffect(() => {
        const target = ref.current!;

        if (capturedPointer !== null) {
            target.setPointerCapture(capturedPointer);
            return () => {
                if (target.hasPointerCapture(capturedPointer))
                    target.releasePointerCapture(capturedPointer);
            }
        }
    }, [ref.current, capturedPointer]);

    return [ref, capturedPointer, setCapturedPointer];
}
