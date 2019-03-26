import React from 'react';
import classNames from 'classnames';

export function TaskBarItem({ className, ...rest }: any) {
    return (
        <div className={classNames("task-bar-item", className)} {...rest} />
    );
}
