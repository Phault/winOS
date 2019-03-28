import React, { ReactNode, HTMLAttributes, CSSProperties } from 'react';
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

export function StaticWindow({left, top, width, height, title, icon, children, handle, active = true, onActivated, style, className}: WindowProps) {

    const activated = () => {
        if (!active && onActivated)
            onActivated();
    };

    return (
        <div className={classNames(className, "window", { inactive: !active })} style={{ ...style, transform: `translate(${left}px, ${top}px)`, width, height }} onPointerDownCapture={activated}>
            <TitleBar title={title || ''} icon={icon} ref={handle} />
            <Frame>
                {children}
            </Frame>
        </div>
    );
}

export default asMovable(asResizable(StaticWindow));

interface TitleBarButtonProps extends HTMLAttributes<any> {
    icon?: string;
}

const Button: React.FC<TitleBarButtonProps> = ({icon, children, className, ...rest}) => {
    const iconNode = icon && <div className="btn-icon" style={{borderImageSource: `url(${icon})`}} />;
    
    return (
        <button className={classNames('btn', className)} type="button" {...rest}>
            {iconNode}
            {children}
        </button>
    );
}

export { Button };