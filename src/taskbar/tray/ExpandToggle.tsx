import React from 'react';
import styled from 'styled-components/macro';
import expandIcon from '../../assets/widgets/tray-expand.png';

export interface ExpandToggleProps {
  expanded?: boolean;
}

const FlippedStyle = {
  transform: 'scaleX(-1)',
};

export const ExpandToggle = styled((props: ExpandToggleProps) => (
  <button {...props}>
    <img
      src={expandIcon}
      draggable={false}
      alt="Expand notification tray"
      style={props.expanded ? FlippedStyle : undefined}
    />
  </button>
)).attrs({
  type: 'button',
})`
  position: absolute;
  left: -9px;
  width: 19px;
  height: 19px;
  margin-top: 1px;
  text-align: center;

  border-radius: 100%;
  border: 1px solid #111f5a;
  border-color: #263368 #c2c6d5 #878eac #111f5a;

  background-color: #90d7f9;
  /* prettier-ignore */
  box-shadow:
    inset -4px -4px 6px #0671EB,
    inset -9px -9px 6px #0C94F0;

  &:hover {
    background-color: #c4e6f9;
    box-shadow: inset -10px -10px 8px -7px #0d98e8;
  }

  &:active {
    background-color: #86caec;
    /* prettier-ignore */
    box-shadow:
        inset -4px -4px 6px #0047BE,
        inset -9px -9px 6px -2px #008FD8;

    img {
      opacity: 0.5;
    }
  }

  img {
    filter: drop-shadow(0 0 1px #00000077);
  }
`;
