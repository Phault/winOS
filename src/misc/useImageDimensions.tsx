import { useState, useEffect } from 'react';
import { Size } from './Size';

export function useImageDimensions(img: string) {
    const [dimensions, setDimensions] = useState<Size>({ width: 0, height: 0 });
    useEffect(() => {
        const image = new Image();
        image.onload = () => setDimensions(image);
        image.src = img;
        return () => { image.onload = null; };
    }, [img]);
    return dimensions;
}
