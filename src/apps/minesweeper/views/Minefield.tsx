import React from 'react';
import { FC } from "react";
import { Grid } from '../utils/Grid';
import { Cell } from "../Cell";
import { CellRenderer } from "./CellRenderer";
import { Observer } from 'mobx-react-lite';

export interface MinefieldProps {
    grid: Grid<Cell>;
    onMouseDown: (e: React.MouseEvent, cell: Cell, x: number, y: number) => void;
    onMouseUp: (e: React.MouseEvent, cell: Cell, x: number, y: number) => void;
}

export const Minefield: FC<MinefieldProps> = ({grid, onMouseDown, onMouseUp}) => (
    // <Observer>
    //     {() => (
            <div className="minefield">
                {grid.map((cell, x, y, grid) => (
                    <CellRenderer 
                        key={y*grid.width+x} 
                        cell={cell} 
                        column={x} 
                        row={y} 
                        onMouseDown={(e) => onMouseDown(e, cell, x, y)} 
                        onMouseUp={(e) => onMouseUp(e, cell, x, y)} 
                        onContextMenu={(e) => e.preventDefault()} />
                ))}
            </div>
    //     )}
    // </Observer>
);