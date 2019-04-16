import React, { Fragment, FC, useState, ReactNode } from 'react';
import { useTimer } from './useTimer';

export interface AutoRefreshProps {
    interval: number;
    render?: () => ReactNode;
}

const AutoRefresh: FC<AutoRefreshProps> = ({interval, render, children}) => {
    const [, setCount] = useState(0);
    useTimer(interval, () => setCount(prev => prev + 1));

    return (
        <Fragment>
            {render && render()}
            {children}
        </Fragment>
    );
}

export { AutoRefresh };