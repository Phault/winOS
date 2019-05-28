import React, { useEffect, useMemo, useRef, ImgHTMLAttributes, forwardRef } from "react";
import { Size } from "../../misc/Size";
import { useImageSize } from "./useImageSize";
import styled from "styled-components/macro";

export const PreviewWrapper = styled.div<{hideOverflow?: boolean}>`
    display: flex;
    height: 100%;
    align-self: stretch;
    overflow: ${props => props.hideOverflow ? 'hidden' : 'auto'};
    padding: 1px;

    img {
      outline: 1px solid black;
      margin: auto;
    }
`;

export interface PreviewProps extends ImgHTMLAttributes<HTMLImageElement>{
    zoom?: 'auto' | number;
    imageSizeChanged: (size: Size) => void;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({zoom = 'auto', imageSizeChanged, ...rest}, ref) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageSize = useImageSize(imageRef);

    useEffect(() => imageSizeChanged(imageSize), [imageSizeChanged, imageSize.width, imageSize.height]);

    const style = useMemo(() => {
      if (zoom === 'auto') {
        return {
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%'
        };
      }

      return {
        width: imageSize.width * zoom,
        height: imageSize.height * zoom
      };
    }, [imageSize.width, imageSize.height, zoom]);
    
    return (
        <PreviewWrapper ref={ref} hideOverflow={zoom === 'auto'}>
          <img {...rest} ref={imageRef} style={style} draggable={false} />
        </PreviewWrapper>
    );
});