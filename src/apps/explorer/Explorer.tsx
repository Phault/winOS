import React, { useState, useContext, useCallback } from 'react';
import { FolderView, FileInfo } from '../../widgets/folderview/FolderView';
import { IconView } from '../../widgets/folderview/views/icon/IconView';
import * as Toolbar from '../../widgets/toolbar';
import folderUpIcon from '../../assets/icons/toolbar/folder_up.png';
import searchIcon from '../../assets/icons/toolbar/search.png';
import foldersIcon from '../../assets/icons/toolbar/folders.png';
import viewIcon from '../../assets/icons/toolbar/view.png';
import { WindowContext } from '../../windows/WindowManager';
import { NavigationHistory } from './NavigationHistory';
import { Observer } from 'mobx-react-lite';
import * as nodePath from 'bfs-path';
import { NavigationHistoryButtons } from './header/NavigationHistoryButtons';
import { OSContext } from '../../App';
import { ExplorerApp } from './ExplorerApp';
import { Header } from './header/Header';
import { Body } from './Body';
import { Sidebar } from './sidebar/Sidebar';
import { Group } from './sidebar/Group';
import { Contents } from './Contents';
import styled from 'styled-components/macro';
import { ViewModeItems } from './header/ViewModeItems';
import { AddressBar } from './header/addressbar/AddressBar';
import { ToolbarMenu } from './header/ToolbarMenu';
import { GroupItem } from './sidebar/GroupItem';
import { useAutorun } from '../../misc/hooks/useAutorun';

const StyledExplorer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
`;

export interface ExplorerProps {
  initialDir: string;
}

export const Explorer: React.FC<ExplorerProps> = ({ initialDir }) => {
  const [history] = useState(() => new NavigationHistory(initialDir));
  const window = useContext(WindowContext)!;
  const { processManager, programManager, fileSystem } = useContext(OSContext)!;

  useAutorun(() => {
    const stats = fileSystem.statSync(history.current);
    window.icon = programManager.getFileIcon({
      path: history.current,
      stats,
    });
    window.title = nodePath.basename(history.current) || ExplorerApp.name;
  }, [fileSystem, programManager, history, window.title, window.icon]);

  const handleFileExecution = useCallback(
    (files: FileInfo[]) => {
      const file = files[0];
      const fullPath = nodePath.isAbsolute(file.path)
        ? file.path
        : nodePath.join(history.current, file.path);

      if (file.stats.isFile()) {
        const apps = programManager.getInstalledForExtension(
          nodePath.extname(fullPath)
        );
        if (apps.length > 0) processManager.run(apps[0], fullPath);
      } else if (fullPath !== history.current) history.push(fullPath);
    },
    [history, processManager, programManager]
  );

  const goUp = useCallback(() => {
    const parentDir = nodePath.normalize(nodePath.join(history.current, '..'));
    if (parentDir !== history.current) history.push(parentDir);
  }, [history]);

  return (
    <StyledExplorer>
      <Header>
        <ToolbarMenu path={history.current} />

        <Toolbar.Toolbar>
          <NavigationHistoryButtons history={history} />

          <Toolbar.Button icon={folderUpIcon} onClick={goUp} />
          <Toolbar.Separator />
          <Toolbar.Button
            icon={searchIcon}
            onClick={() => console.log('search')}>
            Search
          </Toolbar.Button>
          <Toolbar.Button
            icon={foldersIcon}
            onClick={() => console.log('folders')}>
            Folders
          </Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Dropdown icon={viewIcon}>
            <ViewModeItems />
          </Toolbar.Dropdown>
        </Toolbar.Toolbar>

        <Observer>
          {() => (
            <AddressBar
              path={history.current}
              onChange={newValue =>
                handleFileExecution([
                  { path: newValue, stats: fileSystem.statSync(newValue) },
                ])
              }
            />
          )}
        </Observer>
      </Header>

      <Body>
        <Sidebar>
          <Group label="File and Folder Tasks">
            <GroupItem>Make a new folder</GroupItem>
            <GroupItem>Publish this folder to the Web</GroupItem>
            <GroupItem>Share this folder</GroupItem>
          </Group>
          <Group label="Other Places">
            <GroupItem>Desktop</GroupItem>
            <GroupItem>Shared Documents</GroupItem>
            <GroupItem>My Computer</GroupItem>
            <GroupItem>My Network</GroupItem>
          </Group>
        </Sidebar>
        <Contents>
          <Observer>
            {() => (
              <FolderView
                path={history.current}
                viewMode={IconView}
                onExecute={handleFileExecution}
              />
            )}
          </Observer>
        </Contents>
      </Body>
    </StyledExplorer>
  );
};
