import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import logonLogo from './assets/boot-windows-logo.png';
import { MicrosoftLogo } from './MicrosoftLogo';
import { ProgressBar } from './LoadingBar';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const BootLoader = styled(props => (
  <div {...props}>
    <div style={{ flexGrow: 1.3 }} />
    <img src={logonLogo} alt="" />
    <div style={{ flexGrow: 1 }} />
    <ProgressBar width={126} />
    <div style={{ flexGrow: 1 }} />
    <footer>
      <span>Copyright © Microsoft Corporation</span>
      <MicrosoftLogo />
    </footer>
  </div>
))`
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Franklin Gothic Medium;
  font-size: 14px;

  padding: 21px;

  footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 0.5;
  }

  animation: ${fadeIn} 500ms linear;
`;
