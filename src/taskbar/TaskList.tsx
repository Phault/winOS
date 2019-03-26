import React, { useContext } from 'react';
import { TaskBarItem } from './TaskBarItem';
import { TaskListItem } from './TaskListItem';
import { TaskBarItemMenu } from "./TaskBarItemMenu";
import { WindowManagerContext } from '../App';
import { useObserver } from 'mobx-react-lite';

export function TaskList() {
    const windowManager = useContext(WindowManagerContext);

    const items = useObserver(() => {
        const sortedArray = [...windowManager.windows].sort((a, b) => a.id - b.id);

        return sortedArray.map(w => <TaskListItem key={w.id} window={w} />)
    });
    
    return (
        <TaskBarItem className="task-list">
            {items}
            <TaskBarItemMenu />
        </TaskBarItem>
    );
}
