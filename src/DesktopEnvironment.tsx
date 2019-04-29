import React, { FC } from 'react';
import { TaskBar } from './taskbar/TaskBar';
import { Desktop } from './desktop/Desktop';
import { WindowRenderer } from './windows/WindowRenderer';
import styled from 'styled-components/macro';
import bliss from './assets/wallpapers/bliss.jpg';

const UsableArea = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
`;

const StyledDesktopEnvironment = styled(UsableArea)`
    background: url(${bliss}) center / cover no-repeat;
`

export const DesktopEnvironment: FC = () => (
    <StyledDesktopEnvironment>
        <UsableArea>
            <Desktop path="/Documents and Settings/Administrator/Desktop" />
            <WindowRenderer />
        </UsableArea>
        <TaskBar height={30} />
    </StyledDesktopEnvironment>
);