import React from 'react';
import { Position } from './Position';
import { Rectangle } from './Rectangle';

interface MovableComponentProps extends Partial<Position> {
    handle?: React.Ref<HTMLDivElement>;
}

interface MovableProps extends Position {
    onMove: (pos: Position) => void;
}

interface MovableState {
    isMoving: boolean;
    anchor: Position;
}

function InsideRectangle(rect: Rectangle, x: number, y: number) {
    if (x < rect.left || y < rect.top)
        return false;

    if (x > rect.left + rect.width || y > rect.top + rect.height)
        return false;

    return true;
}

export default function asMovable<P extends MovableComponentProps>(WrappedComponent: React.ComponentType<P>) {
    return class extends React.Component<P & MovableProps, MovableState> {
        state: MovableState = {
            isMoving: false,
            anchor: { left: 0, top: 0 },
        }

        handleRef = React.createRef<HTMLDivElement>();

        onMove = (e: React.PointerEvent<HTMLDivElement>) => {
            if (this.state.isMoving) {
                this.props.onMove({
                    left: e.clientX - this.state.anchor.left,
                    top: e.clientY - this.state.anchor.top
                })                

                e.stopPropagation();
            }
        }

        onDown = (e: React.PointerEvent<HTMLDivElement>) => {
            if (this.handleRef.current && !InsideRectangle(this.handleRef.current.getBoundingClientRect(), e.clientX, e.clientY))
                return;

            this.setState({
                isMoving: true, 
                anchor: {
                    left: e.clientX - this.props.left,
                    top: e.clientY - this.props.top
                }
            });

            e.currentTarget.setPointerCapture(e.pointerId);
            e.stopPropagation();
        }

        onUp = (e: React.PointerEvent<HTMLDivElement>) => {
            if (!this.state.isMoving)
                return;

            this.setState({
                isMoving: false
            });

            e.currentTarget.releasePointerCapture(e.pointerId);
            e.stopPropagation();
        }

        render() {
            return (
                <div 
                    onPointerDown={this.onDown}
                    onPointerMove={this.onMove}
                    onPointerUp={this.onUp}>
                    <WrappedComponent
                        {...this.props}
                        left={this.props.left}
                        top={this.props.top}
                        handle={this.handleRef} />
                </div>
            );
        }
    }
}