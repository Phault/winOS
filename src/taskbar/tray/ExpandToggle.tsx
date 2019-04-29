import React from 'react';
import styled from 'styled-components/macro';
import expandIcon from '../../assets/widgets/tray-expand.png';

export interface ExpandToggleProps {
    expanded?: boolean;
}

const FlippedStyle = {
    transform: 'scaleX(-1)'
};

export const ExpandToggle = styled((props: ExpandToggleProps) =>
    <button {...props}>
        <img 
            src={expandIcon} 
            draggable={false} 
            alt="Expand notification tray" 
            style={props.expanded ? FlippedStyle : undefined} />
    </button>
).attrs({
    type: 'button'
})`
    position: absolute;
    left: -9px;
    width: 19px;
    height: 19px;
    margin-top: 1px;
    text-align: center;

    border-radius: 100%;
    border: 1px solid #111F5A;
    border-color: #263368 #C2C6D5 #878EAC #111F5A;

    background-color: #90D7F9;
    box-shadow:
        inset -4px -4px 6px #0671EB,
        inset -9px -9px 6px #0C94F0;

    &:hover {
        background-color: #C4E6F9;
        box-shadow: inset -10px -10px 8px -7px #0D98E8;
    }

    &:active {
        background-color: #86CAEC;
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