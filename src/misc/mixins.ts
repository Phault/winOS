import { css } from 'styled-components/macro';

export const background = css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
    content: '';
    border-style: solid;
`;

export const sprite = (x: number, y: number, width:number, height: number) => css`
    width: ${width};
    height: ${height};
    background-position: ${x}px ${y}px;
`;