import React, { useContext, Fragment } from 'react';
import { TaskBarItem } from './TaskBarItem';
import { TaskListItem } from './TaskListItem';
import { TaskBarItemMenu } from "./TaskBarItemMenu";
import { WindowManagerContext } from '../App';
import { Observer, useObserver } from 'mobx-react-lite';

export function TaskList() {
    const windowManager = useContext(WindowManagerContext);

    const items = useObserver(() => windowManager.windows.map(w => (
        <TaskListItem 
            key={w.id} 
            icon={w.icon}>
            {w.title}
        </TaskListItem>
    )));
    
    return (
        <TaskBarItem className="task-list">
            {items}
            <TaskBarItemMenu />
        </TaskBarItem>
    );
}
