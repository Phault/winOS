import React from 'react';
import fallbackIcon from '../assets/icons/3.png';
import { Button } from './Window';

export interface TitleBarProps {
    title: string;
    icon?: string;
}

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(({ title, icon }, ref) => (
    <div className="title-bar" ref={ref}>
        <img className="app-icon" src={icon || fallbackIcon} draggable={false} />
        <span>{title}</span>
        <div className="title-bar-buttons">
            <Button>_</Button>
            <Button>□</Button>
            <Button className="btn-danger">X</Button>
        </div>
    </div>
));
