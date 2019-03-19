import React from 'react';
import { WindowManager } from "../windows/WindowManager";
import { TaskBarItem } from './TaskBarItem';
import { TaskListItem } from './TaskListItem';
import { TaskBarItemMenu } from "./TaskBarItemMenu";

export function TaskList({ windowManager }: {
    windowManager: WindowManager;
}) {
    const items = Array.from(windowManager.getWindows()).map(([id, w]) => <TaskListItem key={id} icon={w.icon}>{w.title}</TaskListItem>);
    
    return (
        <TaskBarItem className="task-list">
            {items}
            <TaskBarItemMenu />
        </TaskBarItem>
    );
}
