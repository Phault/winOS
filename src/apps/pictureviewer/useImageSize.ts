import { useState, RefObject, useLayoutEffect } from "react";
import { Size } from "../../misc/Size";

export function useImageSize(imageRef: RefObject<HTMLImageElement | null>): Size {
    const [imageSize, setImageSize] = useState({width: 0, height: 0});

    useLayoutEffect(() => {
        const image = imageRef.current; 

        if (!image) 
            return;

        if (image.naturalWidth)
            setImageSize({width: image.naturalWidth, height: image.naturalHeight});

        image.onload = () => setImageSize({width: image.naturalWidth, height: image.naturalHeight});
        return () => { image.onload = null; };
    }, [imageRef, imageRef.current]);

    return imageSize;
}