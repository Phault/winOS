import React, { Component } from 'react';
import './TaskBar.scss';
import { WindowManager } from "../windows/WindowManager";
import { StartPanel } from './StartPanel';
import { NotificationTray } from './NotificationTray';
import { StartButton } from './StartButton';
import { TaskList } from './TaskList';
import { Clock } from './Clock';

interface TaskBarProps {
    height: number;
}

interface TaskBarState {
    startMenuOpen: boolean;
}

export default class TaskBar extends Component<TaskBarProps, TaskBarState> {
    state = {
        startMenuOpen: false
    };

    render() {
        return (
            <div className="task-bar" style={{ minHeight: this.props.height }}>
                {this.state.startMenuOpen && <StartPanel style={{bottom: this.props.height}} />}

                <StartButton onActivated={() => this.setState({startMenuOpen: !this.state.startMenuOpen})} active={this.state.startMenuOpen} />
                <TaskList />
                <NotificationTray>
                    <Clock />
                </NotificationTray>
            </div>
        );
    }
}
