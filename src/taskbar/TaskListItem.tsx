import React, { useContext } from 'react';
import fallbackIcon from '../assets/icons/3.png';
import { WindowInstance } from '../windows/WindowInstance';
import { MenuProvider } from 'react-contexify';
import { TaskBarItemMenu } from "./TaskBarItemMenu";
import classNames from 'classnames';
import { WindowManagerContext, WindowState } from '../App';
import { observer } from 'mobx-react-lite';

interface TaskListItemProps {
    window: WindowInstance
}

const TaskListItem: React.FC<TaskListItemProps> = observer(({ window }) => {

    const windowManager = useContext(WindowManagerContext);
    const active = window === windowManager.focused;

    const onClick = () => {
        if (active)
            windowManager.minimize(window);
        else if (window.state === WindowState.Minimized)
            windowManager.restore(window);
        else
            windowManager.bringToFront(window);
    }

    return (
        <MenuProvider id={TaskBarItemMenu.Id} className={classNames('task-list-item', { active })} render={(props: any) => <div onClick={onClick} {...props} />}>
            <img className="app-icon" src={window.icon || fallbackIcon} draggable={false} />
            <span>{window.title}</span>
        </MenuProvider>
    );
});

export { TaskListItem };