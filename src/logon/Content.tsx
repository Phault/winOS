import styled from 'styled-components/macro';

export const Content = styled.div`
  height: 100%;
  width: 100%;

  background: radial-gradient(circle at 5% 8%, #91b0ee, #5a7edc 15%);

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
  }

  ::before {
    background: linear-gradient(
      to right,
      #5076d4,
      #c3dafd 15% 50%,
      transparent
    );
    top: 0;
  }

  ::after {
    background: linear-gradient(
      to right,
      #06389c,
      #f99737 15% 50%,
      transparent
    );
    bottom: 0;
  }
`;
