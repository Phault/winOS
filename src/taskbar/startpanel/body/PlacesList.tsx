import styled from 'styled-components/macro';
import { List } from './list/List';

export const PlacesList = styled(List)`
  padding: 9px 6px 5px 4px;
  background: #d3e5fa;
  box-shadow: inset 1px 0 #95bdee;

  hr {
    width: 134px;

    &::before,
    &::after {
      content: '';
      display: block;
      height: 1px;
    }

    &::before {
      background: linear-gradient(to right, #81b6ff79, #81b6ff, #81b6ff79);
    }

    &::after {
      background: linear-gradient(to right, #ededed79, #ededed, #ededed79);
    }
  }

  &::after {
    display: relative;
    content: '';
    flex-grow: 1;
  }
`;
