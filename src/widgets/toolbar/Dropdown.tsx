import React, { RefObject, ReactNode, useCallback } from 'react';
import { Icon } from '../Icon';
import dropdownGlyph from '../../assets/widgets/toolbar-dropdown-arrow.png';
import { Menu } from 'react-contexify';
import { useUuid } from '../../misc/hooks/useUuid';
import { openDropdownMenu, Anchor } from '../../misc/openDropdownMenu';
import { ButtonProps, Button } from './Button';

export interface DropdownProps extends ButtonProps {
  label?: string;
  children: ReactNode;
  dropdownAnchor?: Anchor;
  dropdownParent?: RefObject<HTMLElement>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  dropdownAnchor,
  dropdownParent,
  ...rest
}) => {
  const menuId = useUuid();

  const onClicked = useCallback(
    (e: React.MouseEvent) => {
      if (dropdownParent && dropdownParent.current)
        e.currentTarget = dropdownParent.current;

      openDropdownMenu(menuId, e, dropdownAnchor);
    },
    [dropdownParent, menuId, dropdownAnchor]
  );

  return (
    <React.Fragment>
      <Button {...rest} onClick={onClicked}>
        {label}
        <Icon src={dropdownGlyph} />
      </Button>

      <Menu id={menuId}>{children}</Menu>
    </React.Fragment>
  );
};
