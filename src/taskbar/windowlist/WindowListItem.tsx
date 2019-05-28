import React, { useContext } from 'react';
import fallbackIcon from '../../assets/icons/apps/default.png';
import { WindowInstance } from '../../windows/WindowInstance';
import { MenuProvider } from 'react-contexify';
import { WindowListItemMenu } from "./WindowListItemMenu";
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { OSContext } from '../../App';
import styled from 'styled-components/macro';
import { AppIcon } from '../../windows/TitleBar';
import { CSSTransition } from 'react-transition-group';

const StyledWindowListItem = styled(({in: inProp, onExited, ...rest}) => (
    <CSSTransition timeout={1000} classNames="grow-shrink" in={inProp} onExited={onExited}><div {...rest} /></CSSTransition>
))`
    min-height: 26px;
    flex: 0 1 147px;
    position: relative;
    margin: 3px 0 2px 0;
    padding: 4px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;

    border: 1px solid transparent;
    border-color: #3067DD #2652BC #3067DD #2652BC;
    border-radius: 2px;
    background-color: #3980F4;

    box-shadow:
        inset 10px 0px 2px -9px #ffffff55,
        inset 0px 10px 5px -9px #ffffff55,
        inset -1px -1px 2px #00000033;

    span {
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &:hover {
        border-color: #214BA9 #1E3F89 #1E3F89 #214BA9;
        background-color: #55A0FF;

        box-shadow:
            inset 10px 0px 2px -9px #ffffff88,
            inset 0px 10px 5px -8px #ffffff88,
            inset -1px -2px 2px #2D86FF;
    }

    &:active, &.active {
        border-color: #2266D5 #0C3CAE #0C3CAE #082970;
        background-color: #1750B9;

        box-shadow:
            inset 1px 1px 2px #123D94,
            inset -1px -1px 2px #ffffff19;

        &:hover {
            border-color: #2266D5 #0E3C9F #0C3CAE #082970;
            background-color: #2E6CEB;

            box-shadow:
                inset 1px 1px 2px #1B51BE,
                inset -1px -1px 2px #ffffff19;
        }
    }

    &.grow-shrink-enter {
        flex: 0;
    }

    &.grow-shrink-enter-active {
        flex: 0 1 147px;
        transition: flex 150ms linear;
    }

    &.grow-shrink-exit {
        opacity: 0;
        padding: 0;
        border: none;
        margin-right: 10px; // prev padding + border
    }

    &.grow-shrink-exit-active {
        flex: 0;
        margin: 0;
        transition: flex 150ms linear, margin 150ms linear;
    }
`;

export interface WindowListItemProps {
    window: WindowInstance
}

export const WindowListItem: React.FC<WindowListItemProps> = observer(({ window, ...rest }) => {
    const {windowManager} = useContext(OSContext)!;
    const active = window === windowManager.focused;

    const onClick = () => {
        if (active)
            windowManager.minimize(window);
        else if (window.isMinimized)
            windowManager.restore(window);
        else
            windowManager.bringToFront(window);
    }

    return (
        <MenuProvider 
            id={WindowListItemMenu.Id} 
            className={classNames({ active })} 
            render={props => <StyledWindowListItem onClick={onClick} {...props} {...rest} />}>
            
            <AppIcon src={window.icon || fallbackIcon} />
            <span>{window.title}</span>
        </MenuProvider>
    );
});