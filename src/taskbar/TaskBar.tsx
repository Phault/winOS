import React, { useState, useRef } from 'react';
import { StartPanel } from './startpanel/StartPanel';
import { NotificationTray } from './tray/NotificationTray';
import { StartButton } from './StartButton';
import { WindowList } from './windowlist/WindowList';
import { Clock } from './tray/Clock';
import useOnClickOutside from 'use-onclickoutside';
import styled from 'styled-components/macro';

const StyledTaskBar = styled.div<TaskBarProps>`
    position: relative;
    z-index: 1000;

    display: flex;
    align-items: flex-start;

    color: white;
    font-family: Tahoma;
    font-size: 11px;

    min-height: ${props => props.height}px;

    background: linear-gradient(
        to bottom, 
        #3168d5 0%, 
        #4993e6 7% 10%, 
        #235cdb 24% 87%, 
        #1941a5 98%);

    >* {
        position: relative;
    }
`;

export interface TaskBarProps {
    height: number;
}

const TaskBar: React.FC<TaskBarProps> = ({height}) => {
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    const ref = useRef(null);
    useOnClickOutside(ref, () => setStartMenuOpen(false));

    return (
        <StyledTaskBar height={height} ref={ref}>
            <StartPanel style={{bottom: height, display: startMenuOpen ? 'flex' : 'none' }} onClose={() => setStartMenuOpen(false)} />

            <StartButton onClick={() => {setStartMenuOpen(!startMenuOpen)}} active={startMenuOpen} />
            <WindowList />
            <NotificationTray>
                <Clock />
            </NotificationTray>
        </StyledTaskBar>
    );
}

export { TaskBar };
