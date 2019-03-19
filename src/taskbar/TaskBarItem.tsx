import React from 'react';

export function TaskBarItem({ className, ...rest }: any) {
    return (
        <div className={"task-bar-item " + (className || '')} {...rest} />
    );
}
