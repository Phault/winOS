import { css } from 'styled-components/macro';

export const bevel = (topLeftColor: string, bottomRightColor: string, width: number) => css`
    border: ${width}px solid ${topLeftColor};
    border-right-color: ${bottomRightColor};
    border-bottom-color: ${bottomRightColor};
    border-top-right-radius: 2px;
    border-bottom-left-radius: 2px;
`;
