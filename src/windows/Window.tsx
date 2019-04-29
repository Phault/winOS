import React, { ReactNode, HTMLAttributes, CSSProperties } from 'react';
import asResizable from '../misc/Resizable';
import asMovable from '../misc/Movable';
import { Rectangle } from '../misc/Rectangle';
import { TitleBar } from './TitleBar';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import { background } from '../misc/mixins';

const Frame = styled(({className, children}) => (
    <div className={className}>
        <FrameInner>{children}</FrameInner>
    </div>
))`
    flex-grow: 1;
    padding: 4px;
    padding-top: 3px;
    margin-top: -3px;
    overflow: hidden;

    background: #0855dd;
    box-shadow: 
        inset 0 -1px 0 0 #00138c,
        inset 0 -2px 0 0 #001ea099,
        inset 0 -3px 0 0 #074fea55,
        inset 0 0 0 1px #0734da,
        inset 0 0 0 2px #166aee;

    .inactive & {
        background: #758cdc;
        box-shadow: 
        inset 0 -1px 0 0 #4f53bc,
        inset 0 -2px 0 0 #6d74cd99,
        inset 0 -3px 0 0 #7587dd55,
        inset 0 0 0 1px #5b68cd,
        inset 0 0 0 2px #7480dc;
    }
`;

const FrameInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    background: white;
`;

const StyledWindow = styled.div.attrs<Rectangle>(({left, top, width, height}) => ({
    style: {
        transform: `translate(${left}px, ${top}px)`, 
        width: `${width}px`,
        height: `${height}px`
    }
}))`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    pointer-events: initial;
`;

export interface WindowProps extends Rectangle {
    title?: string;
    children?: ReactNode;
    handle?: React.Ref<HTMLDivElement>;
    icon?: string;
    active?: boolean;
    onActivated?: () => void;
    className?: string;
    style?: CSSProperties;
}

export function StaticWindow({
    left, top, width, height, 
    title, icon, handle, 
    active = true, onActivated, 
    children, className, style}: WindowProps) {

    const activated = () => {
        if (!active && onActivated)
            onActivated();
    };

    const roundedRect = {
        left: Math.floor(left),
        top: Math.floor(top),
        width: Math.floor(width),
        height: Math.floor(height),
    }

    return (
        <StyledWindow 
            {...roundedRect}
            className={classNames(className, { inactive: !active })} 
            style={style}
            onPointerDownCapture={activated}>

            <TitleBar title={title || ''} icon={icon} ref={handle} />
            
            <Frame>
                {children}
            </Frame>
        </StyledWindow>
    );
}

const Window = asMovable(asResizable(StaticWindow));

export { Window };

const StyledButton = styled.button.attrs({
    type: 'button'  
})`
    padding: 2px;
    width: 21px;
    height: 21px;
    color: white;
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid white;
    border-radius: 3px;
    box-shadow: inset 1px 1px 0px 0px #00000020,
                inset -1px -1px 1px 0px #00000050;

    background:
        radial-gradient(circle at 75% 40%, #0e50edAA 10%, transparent 50%) no-repeat, 
        radial-gradient(circle at 40% 30%, #0e50ed44 10%, transparent 30%) no-repeat,
        radial-gradient(circle at -10% 95%, #0e50ed99 0%, transparent 30%) no-repeat, 
        radial-gradient(circle at 15% 15%, #ffffff90 0%, #0e50ed 85%) no-repeat;
    background-color: #0e50ed;

    &:not(:disabled) {
        &:hover {
            background:
                radial-gradient(circle at 65% 78%, #33b1ff 10%, transparent 50%) no-repeat, 
                radial-gradient(circle at 75% 40%, #0e50ed88 10%, transparent 50%) no-repeat, 
                radial-gradient(circle at 40% 30%, #0e50ed22 10%, transparent 30%) no-repeat,
                radial-gradient(circle at -10% 95%, #0e50ed99 0%, transparent 30%) no-repeat, 
                radial-gradient(circle at 15% 15%, #ffffff90 0%, #0e50ed 85%) no-repeat;
        }
    
        &:active, &.active {
            background: radial-gradient(circle at 70% 70%, #0062c6 0%, #0048ad 50%, #002d68 100%) no-repeat; 
            box-shadow: inset 5px 5px 2px -5px #000000aa;
        }


        .inactive &, &.inactive {
            &:not(:hover) {
                opacity: 0.7;
            }
        }
    }
    
    &.danger {
        background:
            radial-gradient(circle at 70% 50%, #E5430DAA 0%, transparent 50%) no-repeat, 
            radial-gradient(circle at 40% 35%, #E5430D44 10%, transparent 30%) no-repeat,
            radial-gradient(circle at 0% 100%, #E5430DCC 0%, transparent 30%) no-repeat, 
            radial-gradient(circle at 15% 15%, #ffffff90 0%, #E5430D 85%) no-repeat;
        background-color: #E5430D;

        &:not(:disabled) {
            &:hover {
                background:
                    radial-gradient(circle at 63% 70%, #FFA27DFF 10%, transparent 35%) no-repeat, 
                    radial-gradient(circle at 75% 40%, #FB5441DD 10%, transparent 50%) no-repeat, 
                    radial-gradient(circle at 40% 30%, #FB544144 10%, transparent 30%) no-repeat,
                    radial-gradient(circle at 0% 100%, #FB5441DD 10%, transparent 30%) no-repeat, 
                    radial-gradient(circle at 15% 15%, #ffffff90 0%, #FB5441 85%) no-repeat;
                background-color: #FB5441;
            }

            &:active, &.active {
                background: radial-gradient(circle at 70% 70%, #D04D24 0%, #BA391B 50%, #8D2C14 100%) no-repeat; 
            }
        }
    }

    &::before {
        ${background}
        border: none;
        margin: -1px;
        border-radius: 3px;
        background: #4860a1;
        opacity: 0;
    }
    
    &:disabled::before {
        opacity: 0.85;
    }
`;

const StyledButtonIcon = styled.div<{src: string}>`
    width: 13px;
    height: 13px;

    background: url(${props => props.src});

    *:disabled>& {
        opacity: 0.4;
    }

    *:active:not(:disabled)>& {
        opacity: 0.45;
    }
`;

interface TitleBarButtonProps extends HTMLAttributes<HTMLButtonElement> {
    icon?: string;
    disabled?: boolean;
}

const Button: React.FC<TitleBarButtonProps> = ({icon, children, ...rest}) => {
    const iconNode = icon && <StyledButtonIcon src={icon} />;
    
    return (
        <StyledButton {...rest}>
            {iconNode}
            {children}
        </StyledButton>
    );
}

export { Button };