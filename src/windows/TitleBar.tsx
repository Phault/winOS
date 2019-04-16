import React, { useContext } from 'react';
import fallbackIcon from '../assets/icons/apps/default.png';
import { Button } from './Window';
import minimizeIcon from '../assets/window-button-icon-minimize.png';
import closeIcon from '../assets/window-button-icon-close.png';
import maximizeIcon from '../assets/window-button-icon-maximize.png';
import restoreIcon from '../assets/window-button-icon-restore.png';
import { WindowContext } from './WindowManager';
import { OSContext } from '../App';

export interface TitleBarProps {
    title: string;
    icon?: string;
}

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(({ title, icon }, ref) => {
    const { windowManager } = useContext(OSContext)!;
    const window = useContext(WindowContext)!;

    function toggleMaximize() {
        window.isMaximized = !window.isMaximized;
    }

    return (
        <div className="title-bar" ref={ref} onDoubleClick={() => window.isResizable && toggleMaximize()}>
            <img 
                className="app-icon" 
                src={icon || fallbackIcon} 
                draggable={false} 
                onDoubleClick={() => window.destroy()} 
                onPointerDown={e => e.stopPropagation()}/>
                
            <span>{title}</span>

            <div className="title-bar-buttons" onPointerDown={e => e.stopPropagation()} onDoubleClick={e => e.stopPropagation()}>
                <Button icon={minimizeIcon} onClick={() => windowManager.minimize(window)} />
                <Button icon={window.isMaximized ? restoreIcon : maximizeIcon} disabled={!window.isResizable} onClick={toggleMaximize}/>
                <Button className="btn-danger" icon={closeIcon} onClick={() => window.destroy()}/>
            </div>
        </div>
    )
});
