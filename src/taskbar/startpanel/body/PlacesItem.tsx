import styled from 'styled-components/macro';
import { Item } from './list/Item';

export interface PlacesItemProps {
  favorite?: boolean;
}

export const PlacesItem = styled(Item)<PlacesItemProps>`
  color: rgb(10, 36, 106);

  .icon {
    width: 24px !important;
    height: 24px !important;
  }

  .content h1 {
    font-weight: ${props => (props.favorite ? 'bold' : 'normal')};
  }
`;
