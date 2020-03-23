import React, { ButtonHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import styled from 'styled-components/macro';
import { SplitButton } from './SplitButton';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
}

export const Button = styled(({ icon, children, ...rest }: ButtonProps) => (
  <button type="button" {...rest}>
    {icon && <Icon src={icon} />}
    <div>{children}</div>
  </button>
))`
  padding: 6px 3px;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-right: 4px;

  > * {
    pointer-events: none;
  }

  .icon:not(:last-child) {
    margin-right: 4px;
  }

  &:disabled {
    filter: grayscale(100%) opacity(80%);
  }

  &:not(:disabled) {
    &:hover,
    ${SplitButton}:hover & {
      background: #f4f4ee;
      border-color: rgb(206, 206, 195);
      /* prettier-ignore */
      box-shadow: 
        inset -2px -3px 2px -2px #D7D2C6,
        inset 0px 20px 3px -17px #FDFDFC;
    }

    &:active:hover {
      color: white;
      background: #e2e1d9;
      border-color: #9d9d92;
      /* prettier-ignore */
      box-shadow: 
        inset 0px -20px 3px -19px #FDFDFC,
        inset 2px 3px 2px -2px #D7D2C6;

      & > * {
        transform: translate(1px, 1px);
      }
    }
  }

  ${SplitButton} & {
    margin-right: 0;

    &:not(:first-child) {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

// const LightButton = styled(Button)`
//     &:not(:disabled) {
//         &:hover, .toolbar-split:hover & {
//             background: white;
//             border-color: #7A98AF;
//             box-shadow: none;
//         }

//         &:active:hover {
//             background: white;
//             border-color: #7A98AF;
//             box-shadow: inset -2px -3px 2px -2px #E4DED8;
//             color: black;
//         }
//     }
// `;
