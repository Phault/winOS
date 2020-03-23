import React, { ReactNode } from 'react';
import { Menu } from 'react-contexify';
import classNames from 'classnames';
import styled from 'styled-components/macro';

const StyledMenuBarMenu = styled.div`
  color: black;
  padding: 3px 6px;

  &:hover,
  &.active {
    background: rgb(49, 106, 197);
    color: white;
  }

  &:not(:last-child) {
    margin-right: 1px;
  }
`;

export interface MenuProps {
  label: string;
  id?: string;
  active?: boolean;
  children: ReactNode;
  onMenuHidden?: () => void;
}

export const MenuBarMenu: React.FC<MenuProps> = ({
  active,
  label,
  id,
  children,
  onMenuHidden,
  ...rest
}) => {
  return (
    <React.Fragment>
      <StyledMenuBarMenu className={classNames({ active })} {...rest}>
        {label}
      </StyledMenuBarMenu>

      <Menu id={id || label} onHidden={onMenuHidden}>
        {children || <div />}
      </Menu>
    </React.Fragment>
  );
};
