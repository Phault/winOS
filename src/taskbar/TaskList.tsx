import React, { useContext } from 'react';
import { TaskBarItem } from './TaskBarItem';
import { TaskListItem } from './TaskListItem';
import { TaskBarItemMenu } from "./TaskBarItemMenu";
import { useObserver } from 'mobx-react-lite';
import { OSContext } from '../App';

export function TaskList() {
    const { windowManager: windows } = useContext(OSContext)!;

    const items = useObserver(() => {
        const sortedArray = [...windows.windows].sort((a, b) => a.id - b.id);

        return sortedArray.map(w => <TaskListItem key={w.id} window={w} />)
    });
    
    return (
        <TaskBarItem className="task-list">
            {items}
            <TaskBarItemMenu />
        </TaskBarItem>
    );
}
