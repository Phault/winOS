import React, { useRef, HTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import logonProgress from './assets/boot-progress.png';

function ProgressKeyFrames(cellWidth: number, cellCount: number) {
  return keyframes`
    from {
      left: -${cellWidth * 4}px;
    }

    to {
      left: ${cellWidth * cellCount}px;
    }
  `;
}

const ProgressBarFilling = styled.img<{cellWidth: number, cellCount: number}>`
  position: absolute;
  animation: 
    ${props => ProgressKeyFrames(props.cellWidth, props.cellCount)} 
    1.5s 
    steps(${props => props.cellCount + 4}, start) 
    infinite;
`;

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
}

export const ProgressBar = styled(({width, ...rest}: ProgressBarProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div {...rest}>
      <div ref={wrapperRef}>
        <ProgressBarFilling src={logonProgress} cellCount={Math.ceil(width / 8)} cellWidth={8} />
      </div>
    </div>
  );
})`
  width: ${props => props.width}px;
  height: 15px;
  border: 1px solid #b0b0b0;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px #404040;
  padding: 2px;

  div {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
`;