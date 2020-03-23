import React, { useContext } from 'react';
import { ViewModeProps, FileInfo, FileSelectionContext } from '../../FolderView';
import { Icon, IconProps } from './';
import { useUuid } from '../../../../misc/hooks/useUuid';
import { FileContextMenu } from '../../FileContextMenu';
import { MenuProvider } from 'react-contexify';
import { Observer } from 'mobx-react-lite';
import styled from 'styled-components/macro';
import { OSContext } from '../../../../App';
import { asSelectable } from "../../../dragselect/SelectableItem";

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

    position: relative;

    touch-action: none;
`;

export const IconView: React.FC<ViewModeProps> = ({ files, onExecute}) => {
    const fileContextMenuId = useUuid();

    const {programManager} = useContext(OSContext)!;
    const selection = useContext(FileSelectionContext);

    function onFileClick(e: React.MouseEvent, file: FileInfo) {
        const [element] = [...selection.items].find(([_element, config]) => config.data === file)!;

        if (e.ctrlKey)
            selection.toggleSelected(element);
        else
            selection.setSelection([element]);

        e.stopPropagation();
    }

    function onFileDoubleClick(e: React.MouseEvent, file: FileInfo) {
        if (onExecute)
            onExecute([file]);

        e.stopPropagation();        
    }

    return (
        <>
            <StyledIconView onMouseDown={e => !e.ctrlKey && selection.clearSelection()}>
                {(files || []).map((f) => (
                    <MenuProvider 
                        id={fileContextMenuId} 
                        key={f.path}
                        storeRef={false} 
                        render={props => (
                            <Observer>
                                {() => (
                                    <SelectableIcon 
                                        {...props}
                                        data={f}
                                        icon={programManager.getFileIcon(f)} 
                                        onPointerDown={(e: any) => e.stopPropagation()}
                                        onMouseDown={(e:any) => onFileClick(e, f)} 
                                        onDoubleClick={(e: any) => onFileDoubleClick(e, f)}>
                                        {f.path}
                                    </SelectableIcon>
                                )}
                            </Observer>
                        )}>{' '}</MenuProvider>
                ))}
            </StyledIconView>
            <FileContextMenu id={fileContextMenuId} />
        </>
    );
};

const SelectableIcon = asSelectable<IconProps, FileInfo>(Icon);