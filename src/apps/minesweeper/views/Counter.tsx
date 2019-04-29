import React from 'react';
import { FC } from "react";
import { Digit } from './Digit';
import styled from 'styled-components';
import { bevel } from '../utils/bevel';

const StyledCounter = styled.div`
    ${props => bevel(props.theme.border.dark, props.theme.border.light, 1)};
`;

export interface CounterProps {
    value: number;
}

export const Counter: FC<CounterProps> = ({value}) => {
    const negative = value < 0;
    let val = Math.min(negative ? 99 : 999, Math.abs(value)).toString(10);

    for (let i = val.length; i < (negative ? 2 : 3); i++)
        val = '0' + val;

    if (negative)
        val = '-' + val;

    return (
        <StyledCounter>
            {[...val].map((c, i) => <Digit key={i} symbol={c} />)}
        </StyledCounter>
    );
};