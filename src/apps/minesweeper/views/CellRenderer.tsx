import React, { HTMLProps } from 'react';
import { FC } from "react";
import classNames from 'classnames';
import { Cell, CellMarker } from "../Cell";
import { digitToWord } from "../utils/digitToWord";
import { Observer } from 'mobx-react-lite';

function getCellClass(cell: Cell) {
    if (cell.hidden) {
        switch (cell.marker) {
            case CellMarker.Flag: return 'flag';
            case CellMarker.Unknown: return 'unknown';
            default: return 'hidden';
        }
    } 
    
    if (typeof cell.contents === 'number') {
        if (cell.marker === CellMarker.Flag)
            return 'flag-misplaced';

        return digitToWord(cell.contents);
    }

    if (cell.marker === CellMarker.Flag)
        return 'flag';

    return cell.contents;
}

export interface CellRendererProps extends HTMLProps<HTMLDivElement> {
    cell: Cell;
    column: number;
    row: number;
}

export const CellRenderer: FC<CellRendererProps> = ({cell, column, row, ...rest}) => (
    <Observer>
        {() => (
            <div 
                style={{gridColumn: column + 1}} 
                className={classNames('cell', getCellClass(cell))} 
                {...rest} />
        )}
    </Observer>
);