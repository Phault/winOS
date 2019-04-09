import React, { HTMLProps } from 'react';
import windowsIcon from '../assets/button-start-icon.png';
import { TaskBarItem } from './TaskBarItem';
import classNames from 'classnames';

interface ButtonProps extends HTMLProps<HTMLDivElement> {
    active?: boolean;
    onActivated?: () => void;
}

export function StartButton({ active, onActivated, ...rest }: ButtonProps) {
    return (
        <TaskBarItem className={classNames("btn-start", {active})} onClick={onActivated} {...rest}>
            <img src={windowsIcon} draggable={false} />
            start
        </TaskBarItem>
    );
}
