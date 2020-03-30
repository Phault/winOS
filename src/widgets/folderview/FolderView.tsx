import React, {
  useState,
  useEffect,
  useContext,
  CSSProperties,
  Context,
} from 'react';
import { OSContext } from '../../App';
import Stats from 'browserfs/dist/node/core/node_fs_stats';
import { FolderContextMenu } from './FolderContextMenu';
import { useUuid } from '../../misc/hooks/useUuid';
import { MenuProvider } from 'react-contexify';
import * as nodePath from 'bfs-path';
import { HotKeys, KeyMap, KeySequence } from 'react-hotkeys';
import { rimraf } from '../../misc/io/rimraf';
import styled from 'styled-components/macro';
import { KeyHandlers } from '../../misc/KeyHandlers';
import { SelectionContext, Selection } from '../dragselect/Selection';
import { asSelectableGroup } from '../dragselect/SelectableGroup';

export type ExecuteHandler = (items: FileInfo[]) => void;

export interface ViewModeProps {
  files: FileInfo[];
  onExecute: ExecuteHandler;
}

export interface FolderViewProps {
  path: string;
  viewMode: React.ComponentType<ViewModeProps>;
  onExecute?: ExecuteHandler;

  className?: string;
  style?: CSSProperties;
}

export interface CursorMovementKeyMap extends KeyMap {
  CURSOR_MOVE_UP: KeySequence;
  CURSOR_MOVE_DOWN: KeySequence;
  CURSOR_MOVE_LEFT: KeySequence;
  CURSOR_MOVE_RIGHT: KeySequence;
  CURSOR_EXPAND_UP: KeySequence;
  CURSOR_EXPAND_DOWN: KeySequence;
  CURSOR_EXPAND_LEFT: KeySequence;
  CURSOR_EXPAND_RIGHT: KeySequence;
}

const keyMap: CursorMovementKeyMap = {
  DELETE: 'del',
  RENAME: 'f2',
  REFRESH: 'f5',
  UNDO: 'ctrl+z',
  REDO: 'ctrl+y',
  COPY: 'ctrl+c',
  CUT: 'ctrl+x',
  PASTE: 'ctrl+v',
  SELECT_ALL: 'ctrl+a',
  EXECUTE: 'enter',
  CANCEL: 'esc',
  CURSOR_MOVE_UP: 'up',
  CURSOR_MOVE_DOWN: 'down',
  CURSOR_MOVE_LEFT: 'left',
  CURSOR_MOVE_RIGHT: 'right',
  CURSOR_EXPAND_UP: 'shift+up',
  CURSOR_EXPAND_DOWN: 'shift+down',
  CURSOR_EXPAND_LEFT: 'shift+left',
  CURSOR_EXPAND_RIGHT: 'shift+right',
};

const FillParent = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  position: relative;
`;

// alright this might be a little dumb
export const FileSelectionContext = SelectionContext as Context<
  Selection<FileInfo>
>;

function getSelectedFiles(selection: Selection<FileInfo>) {
  return [...selection.selected].map(item => selection.items.get(item)!.data);
}

export const FolderView: React.FC<FolderViewProps> = asSelectableGroup(
  ({ path, viewMode: ViewMode, onExecute }) => {
    const [contents, setContents] = useState<FileInfo[] | null>(null);
    const contextMenuId = useUuid();

    const { fileSystem } = useContext(OSContext)!;

    const selection = useContext(FileSelectionContext);

    function loadContents(path: string) {
      const files = fileSystem.readdirSync(path);
      const fileInfos = (files || []).map(file => ({
        path: file,
        stats: fileSystem.statSync(nodePath.join(path, file)),
      }));
      setContents(fileInfos);

      selection.clearSelection();
    }

    useEffect(() => loadContents(path), [path]);

    useEffect(() => {
      const watcher = fileSystem.watch(path, () => loadContents(path));
      // todo: if dir is deleted, tell parent so that it can go up to nearest existing dir
      // todo: if a new item is created through context menu, then it should be selected after the refresh
      return () => watcher.close();
    }, [fileSystem, path]);

    function deleteSelection() {
      const files = getSelectedFiles(selection);
      for (const file of files) {
        const fullPath = nodePath.join(path, file.path);
        if (file.stats.isDirectory()) rimraf(fileSystem, fullPath);
        else if (file.stats.isFile()) fileSystem.unlinkSync(fullPath);
      }
    }

    const keyHandlers: KeyHandlers<CursorMovementKeyMap> = {
      DELETE: deleteSelection,
      REFRESH: e => {
        loadContents(path);
        e!.preventDefault();
      },
      EXECUTE: () => {
        onExecute &&
          selection.selected.size &&
          onExecute(getSelectedFiles(selection));
      },
      SELECT_ALL: () => selection.selectAll(),
    };

    return (
      <>
        <HotKeys keyMap={keyMap} handlers={keyHandlers} component={FillParent}>
          <MenuProvider
            id={contextMenuId}
            storeRef={false}
            render={props => <FillParent {...props} />}>
            <ViewMode files={contents!} onExecute={onExecute || (() => {})} />
          </MenuProvider>
        </HotKeys>

        <FolderContextMenu id={contextMenuId} path={path} />
      </>
    );
  },
  FillParent
);

export interface FileInfo {
  path: string;
  stats: Stats;
}
