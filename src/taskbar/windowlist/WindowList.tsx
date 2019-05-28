import React, { useContext } from 'react';
import { TaskBarItem } from '../TaskBarItem';
import { WindowListItem } from './WindowListItem';
import { WindowListItemMenu } from "./WindowListItemMenu";
import { useObserver } from 'mobx-react-lite';
import { OSContext } from '../../App';
import styled from 'styled-components/macro';
import { TransitionGroup } from 'react-transition-group';

const StyledWindowList = styled(TaskBarItem)`
    display: flex;
    flex: auto;
    height: 100%;
    align-items: flex-start;
`;

export function WindowList() {
    const { windowManager } = useContext(OSContext)!;

    const items = useObserver(() => {
        const sortedArray = [...windowManager.windows].sort((a, b) => a.id - b.id);

        return sortedArray.map(w => <WindowListItem key={w.id} window={w} />)
    });
    
    return (
        <StyledWindowList as={TransitionGroup}>
            {items}
            <WindowListItemMenu />
        </StyledWindowList>
    );
}
