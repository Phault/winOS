import React, { useContext } from 'react';
import { TaskBarItem } from '../TaskBarItem';
import { WindowListItem } from './WindowListItem';
import { WindowListItemMenu } from "./WindowListItemMenu";
import { useObserver } from 'mobx-react-lite';
import { OSContext } from '../../App';
import styled from 'styled-components/macro';

const StyledWindowList = styled(TaskBarItem)`
    display: flex;
    flex: auto;
    height: 100%;
    align-items: flex-start;
`;

export function WindowList() {
    const { windowManager: windows } = useContext(OSContext)!;

    const items = useObserver(() => {
        const sortedArray = [...windows.windows].sort((a, b) => a.id - b.id);

        return sortedArray.map(w => <WindowListItem key={w.id} window={w} />)
    });
    
    return (
        <StyledWindowList>
            {items}
            <WindowListItemMenu />
        </StyledWindowList>
    );
}
