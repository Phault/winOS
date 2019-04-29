import React, { useState, useRef } from 'react';
import { ViewModeProps, FileInfo, KeyHandlers, CursorMovementKeyMap } from '../../FolderView';
import { Icon } from './Icon';
import { useUuid } from '../../../../misc/hooks/useUuid';
import { FileContextMenu } from '../../FileContextMenu';
import { MenuProvider } from 'react-contexify';
import { getIcon } from '../../../../misc/fileUtils';
import { HotKeys } from 'react-hotkeys';
import { Observer } from 'mobx-react-lite';
import styled from 'styled-components/macro';

export const StyledIconView = styled.div`
    height: 100%;
    width: 100%;
    flex-grow: 1;
    padding: 2px 1px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;

    overflow-x: hidden;
    overflow-y: auto;
`;

export const IconView: React.FC<ViewModeProps> = ({ files, onExecute, selection}) => {
    const fileContextMenuId = useUuid();
    const [cursorPosition, setCursorPosition] = useState(0);
    const container = useRef<HTMLDivElement>(null);

    function onFileClick(e: React.MouseEvent, file: FileInfo) {
        const index = files.indexOf(file);

        setCursorPosition(index);

        if (e.ctrlKey)
            selection.toggle(index);
        else
            selection.set(index);

        e.stopPropagation();
    }

    function onFileDoubleClick(e: React.MouseEvent, file: FileInfo) {
        if (onExecute)
            onExecute(selection.current.map(i => files[i]));

        e.stopPropagation();        
    }

    function getColumnCount() {
        const containerDiv = container.current!;
        const rowWidth = containerDiv.clientWidth;
        const columnWidth = containerDiv.firstElementChild ? containerDiv.firstElementChild.clientWidth : rowWidth;
        return Math.floor(rowWidth / columnWidth);
    }

    function getRowCount() {
        return Math.ceil(files.length / getColumnCount());
    }

    // function selectionFromTo(start: number, end: number) {
    //     const actualStart = Math.min(start, end);
    //     const actualEnd = Math.max(start, end);
    //     selection.set(files.slice(actualStart, actualEnd + 1).map((_f, i) => actualStart + i));
    //     setCursorPosition(actualEnd);
    // }

    // function getStart() {
    //     return selection.current.reduce((previous, current) => Math.min(previous, current));
    // }

    // function getEnd() {
    //     return selection.current.reduce((previous, current) => Math.max(previous, current));
    // }

    const keyHandlers: KeyHandlers<CursorMovementKeyMap> = {
        CURSOR_MOVE_UP: () => setCursorPosition(cursorPosition - getColumnCount()),
        CURSOR_MOVE_DOWN: () => setCursorPosition(cursorPosition + getColumnCount()),
        CURSOR_MOVE_LEFT: () => setCursorPosition(cursorPosition - 1),
        CURSOR_MOVE_RIGHT: () => setCursorPosition(cursorPosition + 1),
        // CURSOR_EXPAND_UP: () => selectionFromTo(getStart(), getEnd() - getColumnCount()),
        // CURSOR_EXPAND_DOWN: () => selectionFromTo(getStart(), getEnd() + getColumnCount()),
        // CURSOR_EXPAND_LEFT: () => selectionFromTo(getStart(), getEnd() - 1),
        // CURSOR_EXPAND_RIGHT: () => selectionFromTo(getStart(), getEnd() + 1),
    };

    return (
        <HotKeys handlers={keyHandlers} component={StyledIconView} >
            <StyledIconView onMouseDown={e => !e.ctrlKey && selection.clear()} ref={container}>
                {(files || []).map((f, i) => (
                    <MenuProvider 
                        id={fileContextMenuId} 
                        key={f.path} 
                        storeRef={false} 
                        render={props => (
                            <Observer>
                                {() => (
                                    <Icon 
                                        {...props}
                                        icon={getIcon(f)} 
                                        onMouseDown={e => onFileClick(e, f)} 
                                        onDoubleClick={e => onFileDoubleClick(e, f)} 
                                        focus={cursorPosition === i}
                                        active={selection.has(i)}>
                                        {f.path}
                                    </Icon>
                                )}
                            </Observer>
                        )}>{' '}</MenuProvider>
                ))}
            </StyledIconView>
            <FileContextMenu id={fileContextMenuId} />
        </HotKeys>        
    );
};