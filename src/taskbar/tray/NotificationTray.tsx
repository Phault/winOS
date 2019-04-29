import React, { FC } from 'react';
import { TaskBarItem } from '../TaskBarItem';
import styled from 'styled-components/macro';
import { ExpandToggle } from './ExpandToggle';

const StyledNotificationTray = styled(TaskBarItem)`
    display: flex;
    padding: 0 7px 0 16px;
    align-items: center;
    height: 100%;

    border: 1px solid #095bc9;
    border-left-color: #092e51;
    border-right: none;

    box-shadow: 
        inset 2px 0px 2px 0px #22c4f4,
        inset 0px 3px 2px -1px #19b9f3,
        inset 0px -4px 14px 0px #22c4f4;

    background: #0d8dea;
    
    .icon {
        width: 16px;
        height: 16px;
    }
`;

export const NotificationTray: FC = ({ children, ...rest }) => (
    <StyledNotificationTray {...rest}>
        <ExpandToggle />
        {children}
    </StyledNotificationTray>
);
