import React from 'react';
import { FC } from 'react';
import { digitToWord } from '../utils/digitToWord';
import styled from 'styled-components/macro';
import { sprites } from '../utils/sprites';

const StyledDigit = styled.div`
  background: url(${props => props.theme.digits}) no-repeat 0 -23px;
  width: 13px;
  height: 23px;
  float: left;

  ${sprites(23, [
    'minus',
    'blank',
    'nine',
    'eight',
    'seven',
    'six',
    'five',
    'four',
    'three',
    'two',
    'one',
    'zero',
  ])}
`;

export interface DigitProps {
  symbol?: string;
}

export const Digit: FC<DigitProps> = ({ symbol }) => {
  let className;
  switch (symbol) {
    case ' ':
    case '-':
      className = 'minus';
      break;
    case undefined:
      className = 'blank';
      break;
    default:
      className = digitToWord(Number.parseInt(symbol));
      break;
  }

  return <StyledDigit className={className} />;
};
