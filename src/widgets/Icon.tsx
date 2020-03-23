import React from 'react';
import { useImageDimensions } from '../misc/hooks/useImageDimensions';
import styled from 'styled-components/macro';

export interface IconProps {
  src: string;
  width?: number;
  height?: number;
}

const StyledIcon = styled.div<IconProps>`
  background: url(${props => props.src}) center / contain no-repeat;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export const Icon: React.FC<IconProps> = ({ src, width, height, ...rest }) => {
  const dimensions = useImageDimensions(src);

  return (
    <StyledIcon
      className="icon"
      src={src}
      width={width !== undefined ? width : dimensions.width}
      height={height !== undefined ? height : dimensions.height}
      {...rest}
    />
  );
};
