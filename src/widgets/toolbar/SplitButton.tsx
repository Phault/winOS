import React, { useRef, ReactElement } from 'react';
import { Dropdown } from './Dropdown';
import styled from 'styled-components/macro';

const SplitButtonBase: React.FC = ({ children, ...rest }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const childrenWithProps = React.Children.map(children, child => {
    const childElement = child as ReactElement;
    if (childElement.type === Dropdown) {
      return React.cloneElement(childElement, {
        dropdownParent: ref,
      });
    }

    return child;
  });

  return (
    <div ref={ref} {...rest}>
      {childrenWithProps}
    </div>
  );
};

export const SplitButton = styled(SplitButtonBase)`
  display: flex;
  margin-right: 4px;
`;
