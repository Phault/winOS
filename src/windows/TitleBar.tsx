import React, { useContext, useCallback } from 'react';
import fallbackIcon from '../assets/icons/apps/default.png';
import { Button } from './Window';
import minimizeIcon from '../assets/widgets/window-minimize.png';
import closeIcon from '../assets/widgets/window-close.png';
import maximizeIcon from '../assets/widgets/window-maximize.png';
import restoreIcon from '../assets/widgets/window-restore.png';
import { WindowContext } from './WindowManager';
import { OSContext } from '../App';
import styled from 'styled-components/macro';
import * as mixins from '../misc/mixins';

export const AppIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 4px;
`;

const Title = styled.span`
    flex-grow: 1;
    font-family: 'Trebuchet MS';
    font-size: 13px;
    padding-top: 1px;
    font-weight: bold;
    text-shadow: rgb(10, 24, 131) 1px 1px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 3px;
`;

const StyledTitleBar = styled.div`
    width: 100%;
    min-height: 30px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 0;
    padding: 1px 4px 0 6px;

    &::before {
        ${mixins.background}

        background: radial-gradient(ellipse at 90% 25%, #0032c1 10%, #0050da 50%, #207dff 80%);
        border: 1px solid #001abc77;
        border-right-color: #000e7ddd;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        box-shadow: 
            inset 5px 0px 5px -3px #001abc,
            inset -5px 0px 5px -3px #001abc,
            inset 5px 10px 3px -8px #3295ff,
            inset 0px -20px 2px -19px #001abc77;

        .inactive & {
            filter: contrast(0.65) hue-rotate(5deg) saturate(50%) brightness(150%);
            background: radial-gradient(ellipse at 90% 25%, #0050da 50%, #207dff 100%);
        }
    }

    .title-bar-buttons {
        display: flex;
        margin-top: 2px;

        >* {
            margin-right: 2px;
        }
    }
`;

export interface TitleBarProps {
    title: string;
    icon?: string;
}

function blockEvent(e: React.BaseSyntheticEvent) {
    e.stopPropagation();
}

export const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(({ title, icon }, ref) => {
    const { windowManager } = useContext(OSContext)!;
    const window = useContext(WindowContext)!;

    const toggleMaximize = useCallback((e: React.MouseEvent) => {
        window.isMaximized = !window.isMaximized;
        e.stopPropagation();
    }, [window]);

    const closeWindow = useCallback((e: React.MouseEvent) => {
        window.destroy();
        e.stopPropagation();
    }, [window]);

    const minimizeWindow = useCallback((e: React.MouseEvent) => {
        windowManager.minimize(window);
        e.stopPropagation();
    }, [windowManager, window]);

    return (
        <StyledTitleBar ref={ref} onDoubleClick={toggleMaximize}>
            <AppIcon 
                src={icon || fallbackIcon} 
                onDoubleClick={closeWindow} 
                onPointerDown={blockEvent} />
                
            <Title>{title}</Title>

            <div className="title-bar-buttons" onPointerDown={blockEvent} onDoubleClick={blockEvent}>
                <Button icon={minimizeIcon} onClick={minimizeWindow} />
                <Button icon={window.isMaximized ? restoreIcon : maximizeIcon} disabled={!window.isResizable} onClick={toggleMaximize} />
                <Button className="danger" icon={closeIcon} onClick={closeWindow}/>
            </div>
        </StyledTitleBar>
    )
});
