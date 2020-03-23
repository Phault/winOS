import styled from 'styled-components/macro';
import { bevel } from '../utils/bevel';

export const Scoreboard = styled.div`
  ${props => bevel(props.theme.border.dark, props.theme.border.light, 2)}
  margin-bottom: 6px;
  padding: 4px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
