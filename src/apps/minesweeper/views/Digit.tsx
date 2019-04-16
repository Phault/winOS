import React from 'react';
import { FC } from "react";
import classNames from 'classnames';
import { digitToWord } from '../utils/digitToWord';

export interface DigitProps {
    symbol?: string;
}

export const Digit: FC<DigitProps> = ({symbol}) => {
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
            className = digitToWord(Number.parseInt(symbol))
            break;
    }

    return <div className={classNames("digit", className)} />
};