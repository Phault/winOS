import React from 'react';
import { Rectangle } from './Rectangle';
import { Direction } from './Direction';

interface ResizableComponentProps extends Partial<Rectangle> {
}

interface ResizableProps extends Rectangle {
    onResize: (bounds: Rectangle) => void;
    border?: number;
    minWidth?: number;
    minHeight?: number;
}

interface ResizableState {
    isResizing: boolean;
    resizeDir: Direction;
}

export default function asResizable<P extends ResizableComponentProps>(WrappedComponent: React.ComponentType<P>) {
    return class extends React.Component<P & ResizableProps, ResizableState> {
        state: ResizableState = {
            isResizing: false,
            resizeDir: Direction.None
        }

        componentDidMount() {
            this.ensureMinSize();
        }

        componentDidUpdate(prevProps: ResizableProps) {
            if (this.props.width !== prevProps.width || this.props.height !== prevProps.height)
                this.ensureMinSize();
        }

        ensureMinSize() {
            if (this.props.width < (this.props.minWidth || 0) || this.props.height < (this.props.minHeight || 0)) {
                this.props.onResize({
                    left: this.props.left,
                    top: this.props.top,
                    width: Math.max(this.props.width, this.props.minWidth as number || 0),    
                    height: Math.max(this.props.height, this.props.minHeight as number || 0)
                })
            }
        }

        onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
            this.updateCursor(this.getResizeDir(e.clientX, e.clientY));
        }

        onMove = (e: React.PointerEvent<HTMLDivElement>) => {
            if (this.state.isResizing) {
                const props = this.props as ResizableProps;

                const minWidth = props.minWidth || 0;
                const minHeight = props.minHeight || 0;

                let rect = {
                    top: props.top,
                    left: props.left,
                    right: props.left + props.width,
                    bottom: props.top + props.height
                };

                const dir = this.state.resizeDir;

                if ((dir & Direction.North) == Direction.North)
                    rect.top = Math.min(rect.bottom - minHeight, e.clientY);
                else if ((dir & Direction.South) == Direction.South)
                    rect.bottom = Math.max(rect.top + minHeight, e.clientY);

                if ((dir & Direction.West) == Direction.West)
                    rect.left = Math.min(rect.right - minWidth, e.clientX);
                else if ((dir & Direction.East) == Direction.East)
                    rect.right = Math.max(rect.left + minWidth, e.clientX);

                this.props.onResize({
                    top: rect.top,
                    left: rect.left,
                    width: rect.right - rect.left,
                    height: rect.bottom - rect.top
                })

                e.stopPropagation();
            }
            else
                this.updateCursor(this.getResizeDir(e.clientX, e.clientY));
        }

        onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
            this.updateCursor(Direction.None);
        }

        onDown = (e: React.PointerEvent<HTMLDivElement>) => {
            const dir = this.getResizeDir(e.clientX, e.clientY);

            if (dir === Direction.None)
                return;

            this.setState({
                isResizing: true, 
                resizeDir: dir
            });

            e.currentTarget.setPointerCapture(e.pointerId);
            e.stopPropagation();
        }

        onUp = (e: React.PointerEvent<HTMLDivElement>) => {
            if (!this.state.isResizing)
                return;
                
            this.setState({
                isResizing: false
            });
            
            const dir = this.getResizeDir(e.clientX, e.clientY);
            this.updateCursor(dir);

            e.currentTarget.releasePointerCapture(e.pointerId);
            e.stopPropagation();
        }

        getResizeDir(x:number, y:number) {
            const border = this.props.border || 10;

            let dir: Direction = Direction.None;
            
            if (y - this.props.top < border)
                dir |= Direction.North;
            else if (this.props.top + this.props.height - y < border)
                dir |= Direction.South;

            if (x - this.props.left < border)
                dir |= Direction.West;
            else if (this.props.left + this.props.width - x < border)
                dir |= Direction.East;

            return dir;
        }

        updateCursor(dir: Direction) {
            if (this.state.isResizing)
                return;

            document.body.style.cursor = this.mapDirectionToCursor(dir);            
        }

        mapDirectionToCursor(dir: Direction){
            if (dir === Direction.None)
                return 'auto';

            var dirs = '';

            if ((dir & Direction.North) == Direction.North)
                dirs += 'n';
            else if ((dir & Direction.South) == Direction.South)
                dirs += 's';

            if ((dir & Direction.West) == Direction.West)
                dirs += 'w';
            else if ((dir & Direction.East) == Direction.East)
                dirs += 'e';

            return dirs + '-resize';
        }

        render() {
            return (
                <div 
                    onPointerEnter={this.onEnter}
                    onPointerDown={this.onDown}
                    onPointerMove={this.onMove}
                    onPointerUp={this.onUp}
                    onPointerLeave={this.onLeave}>
                    <WrappedComponent 
                        {...this.props}
                        left={this.props.left}
                        top={this.props.top}
                        width={this.props.width} 
                        height={this.props.height} />
                </div>
            );
        }
    }
}