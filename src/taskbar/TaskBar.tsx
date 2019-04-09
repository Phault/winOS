import React, { Component, useState, useRef } from 'react';
import './TaskBar.scss';
import { StartPanel } from './StartPanel';
import { NotificationTray } from './NotificationTray';
import { StartButton } from './StartButton';
import { TaskList } from './TaskList';
import { Clock } from './Clock';
import useOnClickOutside from 'use-onclickoutside';

export interface TaskBarProps {
    height: number;
}

const TaskBar: React.FC<TaskBarProps> = ({height}) => {
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    const ref = useRef(null);
    useOnClickOutside(ref, () => setStartMenuOpen(false));

    return (
        <div className="task-bar" style={{ minHeight: height }} ref={ref}>
            {startMenuOpen && <StartPanel style={{bottom: height}} onClose={() => setStartMenuOpen(false)} />}

            <StartButton onActivated={() => {setStartMenuOpen(!startMenuOpen)}} active={startMenuOpen} />
            <TaskList />
            <NotificationTray>
                <Clock />
            </NotificationTray>
        </div>
    );
}

export { TaskBar };
