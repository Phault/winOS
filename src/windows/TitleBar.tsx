import React, { useContext } from 'react';
import fallbackIcon from '../assets/icons/3.png';
import { Button } from './Window';
import minimizeIcon from '../assets/window-button-icon-minimize.png';
import closeIcon from '../assets/window-button-icon-close.png';
import maximizeIcon from '../assets/window-button-icon-maximize.png';
import { WindowContext } from './WindowManager';
import { WindowManagerContext, WindowState } from '../App';

export interface TitleBarProps {
    title: string;
    icon?: string;
}

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(({ title, icon }, ref) => {

    const windowManager = useContext(WindowManagerContext);
    const window = useContext(WindowContext)!;

    function toggleMaximize() {
        window.state = window.state === WindowState.Maximized 
            ? WindowState.Normal 
            : WindowState.Maximized;
    }

    return (
        <div className="title-bar" ref={ref} onDoubleClick={toggleMaximize}>
            <img 
                className="app-icon" 
                src={icon || fallbackIcon} 
                draggable={false} 
                onDoubleClick={() => windowManager.destroy(window)} 
                onPointerDown={e => e.stopPropagation()}/>
                
            <span>{title}</span>

            <div className="title-bar-buttons" onPointerDown={e => e.stopPropagation()} onDoubleClick={e => e.stopPropagation()}>
                <Button icon={minimizeIcon} onClick={() => windowManager.minimize(window)} />
                <Button icon={maximizeIcon} onClick={toggleMaximize}/>
                <Button className="btn-danger" icon={closeIcon} onClick={() => windowManager.destroy(window)}/>
            </div>
        </div>
    )
});
