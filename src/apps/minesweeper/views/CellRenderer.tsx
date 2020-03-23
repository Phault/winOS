import React from 'react';
import { Cell, CellMarker } from '../Cell';
import { digitToWord } from '../utils/digitToWord';
import styled from 'styled-components/macro';
import { sprites } from '../utils/sprites';
import { Observer } from 'mobx-react-lite';
import { FC, HTMLAttributes } from 'react';

function getCellClass(cell: Cell) {
  if (cell.hidden) {
    switch (cell.marker) {
      case CellMarker.Flag:
        return 'flag';
      case CellMarker.Unknown:
        return 'unknown';
      default:
        return 'hidden';
    }
  }

  if (typeof cell.contents === 'number') {
    if (cell.marker === CellMarker.Flag) return 'flag-misplaced';

    return digitToWord(cell.contents);
  }

  if (cell.marker === CellMarker.Flag) return 'flag';

  return cell.contents;
}

const StyledCellRenderer = styled.div.attrs<CellRendererProps>(
  ({ column }) => ({
    style: { gridColumn: column + 1 },
  })
)<CellRendererProps>`
  width: 16px;
  height: 16px;
  background: url(${props => props.theme.cells}) no-repeat 0 0;

  ${sprites(16, [
    'hidden',
    'flag',
    'unknown',
    'explosion',
    'flag-misplaced',
    'mine',
    'unknown-shown',
    'eight',
    'seven',
    'six',
    'five',
    'four',
    'three',
    'two',
    'one',
    'zero',
  ])}

  &.hidden:active {
    background-position-y: calc(-16px * 15);
  }

  &.unknown:active {
    background-position-y: calc(-16px * 6);
  }
`;

export interface CellRendererProps extends HTMLAttributes<HTMLDivElement> {
  cell: Cell;
  column: number;
  row: number;
}

export const CellRenderer: FC<CellRendererProps> = props => (
  <Observer>
    {() => (
      <StyledCellRenderer className={getCellClass(props.cell)} {...props} />
    )}
  </Observer>
);
