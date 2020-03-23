import React from 'react';
import { FC } from 'react';
import { Grid } from '../utils/Grid';
import { Cell } from '../Cell';
import { CellRenderer } from './CellRenderer';
import styled from 'styled-components/macro';
import { bevel } from '../utils/bevel';

const StyledMinefield = styled.div`
  display: grid;
  grid-auto-columns: 16px;
  grid-auto-rows: 16px;
  grid-auto-flow: column;
  background: ${props => props.theme.background};
  width: fit-content;
  ${props => bevel(props.theme.border.dark, props.theme.border.light, 3)}
`;

export interface MinefieldProps {
  grid: Grid<Cell>;
  onMouseDown: (e: React.MouseEvent, cell: Cell, x: number, y: number) => void;
  onMouseUp: (e: React.MouseEvent, cell: Cell, x: number, y: number) => void;
}

export const Minefield: FC<MinefieldProps> = ({
  grid,
  onMouseDown,
  onMouseUp,
}) => (
  <StyledMinefield>
    {grid.map((cell, x, y, grid) => (
      <CellRenderer
        key={y * grid.width + x}
        cell={cell}
        column={x}
        row={y}
        onMouseDown={e => onMouseDown(e, cell, x, y)}
        onMouseUp={e => onMouseUp(e, cell, x, y)}
        onContextMenu={e => e.preventDefault()}
      />
    ))}
  </StyledMinefield>
);
