import React, { HTMLAttributes } from 'react';
import Truncate from 'react-truncate';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import { Label } from './';

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
    icon?: string;
    children?: string;
    selected?: boolean;
    focus?: boolean;
}

const IconBase: React.FC<IconProps> = React.forwardRef<HTMLDivElement, IconProps>(({ icon, children, className, selected, focus, ...rest }, ref) => (
    <div className={classNames(className, {active: selected, focus})} {...rest} ref={ref}>
        <img src={icon} draggable={false} />
        <Label>
            <Truncate lines={2}>
                {children}
            </Truncate>
        </Label>
    </div>
));

export const Icon = styled(IconBase)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 81px;
    height: 64px;
    margin: 9px 1px;

    color: black;
    font-family: 'Tahoma';
    font-size: 11px;
    text-align: center;
    pointer-events: none;

    >* {
        pointer-events: auto;        
    }

    &:active, &.active {
        img {
            // source: https://codepen.io/stilllife00/pen/avXpgJ
            filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);
        }
    }

    img {
        width: 32px;
        height: 32px;
        padding-bottom: 4px;
        box-sizing: content-box;
    }
`;


