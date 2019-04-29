import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { bevel } from '../utils/bevel';
import { sprites } from '../utils/sprites';

export type SmileyState = 'normal' | 'cool' | 'dead' | 'surprised';

export interface ResetButtonProps extends HTMLAttributes<HTMLButtonElement> {
    state?: SmileyState;
}

export const ResetButton = styled.button.attrs<ResetButtonProps>(props => ({
    type: 'button',
    className: props.state
}))<ResetButtonProps>`
    width: 24px;
    height: 24px;
    background: url(${props => props.theme.smileys}) no-repeat 0 calc(-24px * 4);
    box-sizing: content-box;

    ${props => bevel(props.theme.border.dark, props.theme.border.dark, 1)}
    
    ${sprites(24, [
        'active',
        'cool',
        'dead',
        'surprised',
        'normal'
    ])}

    &:active {
        background-position-y: 0 !important;
    }
`;

ResetButton.defaultProps = {
    state: 'normal'
}