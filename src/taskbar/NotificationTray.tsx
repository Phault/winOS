import React from 'react';
import { TaskBarItem } from './TaskBarItem';
export function NotificationTray({ children, ...rest }: {
    children?: any;
}) {
    return (
        <TaskBarItem className="notify-tray" {...rest}>
            <div className="btn-expand" />
            {children}
        </TaskBarItem>
    );
}
