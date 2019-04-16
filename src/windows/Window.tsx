import React, { ReactNode, HTMLAttributes, CSSProperties, HTMLProps } from 'react';
import './Window.scss';
import asResizable from '../misc/Resizable';
import asMovable from '../misc/Movable';
import { Rectangle } from '../misc/Rectangle';
import { TitleBar } from './TitleBar';
import classNames from 'classnames';

function Frame({ children }: { children?: any }) {
    return (
        <div className="frame">
            {children}
        </div>
    )
}

export interface WindowProps extends Rectangle {
    title?: string;
    children?: ReactNode;
    handle?: React.Ref<HTMLDivElement>;
    icon?: string;
    active?: boolean;
    onActivated?: () => void;
    className?: string;
    style?: CSSProperties;
}

export function StaticWindow({
    left, top, width, height, 
    title, icon, handle, 
    active = true, onActivated, 
    style, className, children}: WindowProps) {

    const activated = () => {
        if (!active && onActivated)
            onActivated();
    };

    const roundedRect = {
        left: Math.floor(left),
        top: Math.floor(top),
        width: Math.floor(width),
        height: Math.floor(height),
    }

    return (
        <div 
            className={classNames(className, "window", { inactive: !active })} 
            style={{ ...style, transform: `translate(${roundedRect.left}px, ${roundedRect.top}px)`, width: roundedRect.width, height: roundedRect.height }} 
            onPointerDownCapture={activated}>

            <TitleBar title={title || ''} icon={icon} ref={handle} />
            
            <Frame>
                {children}
            </Frame>
        </div>
    );
}

const Window = asMovable(asResizable(StaticWindow));

export { Window };

interface TitleBarButtonProps extends HTMLProps<HTMLButtonElement> {
    icon?: string;
}

const Button: React.FC<TitleBarButtonProps> = ({icon, children, className, ...rest}) => {
    const iconNode = icon && <div className="btn-icon" style={{borderImageSource: `url(${icon})`}} />;
    
    return (
        <button className={classNames('btn', className)} {...rest} type="button">
            {iconNode}
            {children}
        </button>
    );
}

export { Button };