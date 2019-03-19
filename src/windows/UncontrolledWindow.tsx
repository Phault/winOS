import React, { ReactNode } from 'react';
import Window from './Window';
import { Rectangle } from '../misc/Rectangle';
import { Position } from '../misc/Position';

export interface UncontrolledWindowProps extends Partial<Rectangle> {
    minWidth?: number;
    minHeight?: number;
    children?: ReactNode;
    title?: string;
    icon?: string;
}

export default class UncontrolledWindow extends React.Component<UncontrolledWindowProps, Rectangle> {
    state: Rectangle = {
        left: this.props.left || 0,
        top: this.props.top || 0,
        width: this.props.width || 0,
        height: this.props.height || 0
    };

    onMove = (pos: Position) => {
        this.setState(pos);
    }

    onResize = (bounds: Rectangle) => {
        this.setState(bounds);
    }

    render() {
        return (
            <Window
                {...this.props}
                {...this.state}
                onMove={this.onMove}
                onResize={this.onResize}>
                {this.props.children}
            </Window>
        );
    }
}
