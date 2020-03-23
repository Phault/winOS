import styled from 'styled-components/macro';

export const Body = styled.div`
  flex-grow: 1;
  color: black;
  background: white;
  z-index: 0;
  display: flex;

  border: 1px solid #1854c2;
  border-left-color: #67a2ea;
  border-right-color: #2c6dd3;

  > * {
    flex: 1 1 50%;
  }
`;
