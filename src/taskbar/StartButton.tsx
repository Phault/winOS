import React from 'react';
import windowsIcon from '../assets/button-start-icon.png';
import { TaskBarItem } from './TaskBarItem';

interface ButtonProps {
    active?: boolean;
    onActivated?: () => void;
}

export function StartButton({ active, onActivated, ...rest }: ButtonProps) {
    return (
        <TaskBarItem className={"btn-start " + (active ? "active " : '')} onClick={onActivated} {...rest}>
            <img src={windowsIcon} draggable={false} />
            start
        </TaskBarItem>
    );
}
