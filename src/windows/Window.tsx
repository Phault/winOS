import React, { ReactNode } from 'react';
import './Window.scss';
import asResizable from '../misc/Resizable';
import asMovable from '../misc/Movable';
import { Rectangle } from '../misc/Rectangle';
import { TitleBar } from './TitleBar';

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
}

export function StaticWindow({left, top, width, height, title, icon, children, handle}: WindowProps) {
    return (
        <div className="window" style={{ left, top, width, height }}>
            <TitleBar title={title || ''} icon={icon} ref={handle} />
            <Frame>
                {children}
            </Frame>
        </div>
    );
}

export default asMovable(asResizable(StaticWindow));

export function Button({icon, children, className}: any) {
    const iconNode = icon && <img className="btn-icon" src={icon} />;
    
    return (
        <button className={"btn " + (className || '')} type="button">
            {iconNode}
            {children}
        </button>
    );
}