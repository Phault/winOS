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

const StyledDesktopEnvironment = styled(UsableArea).attrs({
  // done with inline style to avoid flickering in dev builds
  style: {
    backgroundImage: `url(${bliss})`,
  },
})`
  background: transparent center / cover no-repeat;
`;

export const DesktopEnvironment: FC = () => (
  <StyledDesktopEnvironment>
    <UsableArea>
      <Desktop path="/Documents and Settings/Casper Lindschouw/Desktop" />
      <WindowRenderer />
    </UsableArea>
    <TaskBar height={30} />
  </StyledDesktopEnvironment>
);
