import React, { HTMLProps } from 'react';
import { FC } from "react";
import classNames from 'classnames';

export type SmileyState = 'normal' | 'cool' | 'dead' | 'surprised';

export interface ResetButtonProps extends HTMLProps<HTMLButtonElement> {
    state?: SmileyState;
}

export const ResetButton: FC<ResetButtonProps> = ({state, className, ...rest}) => (
    <button {...rest} type="button" className={classNames('btn-reset', state, className)} />
);

ResetButton.defaultProps = {
    state: 'normal'
}