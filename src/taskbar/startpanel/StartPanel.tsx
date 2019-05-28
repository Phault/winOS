import React, { useContext, CSSProperties } from 'react';
import { OSContext } from '../../App';
import myDocumentsIcon from '../../assets/icons/filetypes/folder-documents.png';
import myRecentDocumentsIcon from '../../assets/icons/filetypes/folder-recent.png';
import myPictures from '../../assets/icons/filetypes/folder-pictures.png';
import myMusicIcon from '../../assets/icons/filetypes/folder-music.png';
import myComputerIcon from '../../assets/icons/computer.png';
import searchIcon from '../../assets/icons/search.png';
import helpIcon from '../../assets/icons/help.png';
import runIcon from '../../assets/icons/run.png';
import connectToIcon from '../../assets/icons/connect.png';
import printersAndFaxesIcon from '../../assets/icons/printers-and-faxes.png';
import controlPanelIcon from '../../assets/icons/apps/control-panel.png';
import internetExplorerIcon from '../../assets/icons/apps/internet-explorer.png';
import outlookIcon from '../../assets/icons/apps/outlook.png';
import programAccessIcon from '../../assets/icons/program-access.png';
import { Program } from '../../Program.interface';
import { ExplorerApp } from '../../apps/explorer';
import styled from 'styled-components/macro';
import logoffIcon from '../../assets/widgets/startpanel-logoff.png';
import shutdownIcon from '../../assets/widgets/startpanel-shutdown.png';
import { SessionButton, WarningIcon, DangerIcon } from './footer/SessionButton';
import { MoreProgramsButton } from './body/MoreProgramsButton';
import { Spacer } from "./body/list/Spacer";
import { Item } from "./body/list/Item";
import { ProgramList } from './body/ProgramList';
import { PlacesList } from './body/PlacesList';
import { PlacesItem } from "./body/PlacesItem";
import profilePicture from '../../assets/avatars/profile.png';
import { Avatar } from './header/Avatar';
import { Header } from './header/Header';
import { Body } from './body/Body';
import { Footer } from './footer/Footer';

const StyledStartPanel = styled.section`
    && {
        position: fixed;
        z-index: 99999;
        left: 0;
        bottom: 0;
        min-width: 380px;
        min-height: 494px;
        display: flex;
        flex-direction: column;
        filter: drop-shadow(2px 2px 1px rgb(0,0,0,0.4));

        border-style: solid;
        border-color: #3E74CD #1854C2;
        border-width: 1px 1px 0;
        border-radius: 7px 7px 0 0;
        overflow: hidden;
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        box-shadow: inset -20px 0px 4px -19px #1854C2;
        pointer-events: none;
    }
`;

export interface StartPanelProps {
    onClose: () => void;
    className?: string;
    style?: CSSProperties;
}

export const StartPanel: React.FC<StartPanelProps> = ({ onClose, ...rest }) => {
    const { programManager, processManager } = useContext(OSContext)!;

    function run(program: Program, args?: string) {
        processManager.run(program, args);
        onClose();
    }

    const programs = programManager.installed
        .filter(p => !p.hidden)
        .map((p, i) => (
            <Item key={i} title={p.name} icon={p.icon} onClick={() => run(p)} />
        ));

    return (
        <StyledStartPanel {...rest}>
            <Header>
                <Avatar src={profilePicture} />
                Casper Lindschouw
            </Header>
            <Body>
                <ProgramList>
                    <Item title="Internet" subtitle="Internet Explorer" icon={internetExplorerIcon} />
                    <Item title="E-mail" subtitle="Outlook Express" icon={outlookIcon} />
                    <hr />
                    {programs}
                    <Spacer />
                    <hr />
                    <MoreProgramsButton>All Programs</MoreProgramsButton>
                </ProgramList>
                <PlacesList>
                    <PlacesItem title="My Documents" icon={myDocumentsIcon} favorite
                        onClick={() => run(ExplorerApp, '/Documents and Settings/Casper Lindschouw/My Documents')} />
                    <PlacesItem title="My Recent Documents" icon={myRecentDocumentsIcon} favorite
                        onClick={() => run(ExplorerApp, '/Documents and Settings/Casper Lindschouw/Recent')} />
                    <PlacesItem title="My Pictures" icon={myPictures} favorite
                        onClick={() => run(ExplorerApp, '/Documents and Settings/Casper Lindschouw/My Documents/My Pictures')} />
                    <PlacesItem title="My Music" icon={myMusicIcon} favorite
                        onClick={() => run(ExplorerApp, '/Documents and Settings/Casper Lindschouw/My Documents/My Music')} />
                    <PlacesItem title="My Computer" icon={myComputerIcon} favorite
                        onClick={() => run(ExplorerApp, '/')} />
                    <hr />
                    <PlacesItem title="Control Panel" icon={controlPanelIcon} />
                    <PlacesItem title="Set Program Access and Defaults" icon={programAccessIcon} />
                    <PlacesItem title="Connect To" icon={connectToIcon} />
                    <PlacesItem title="Printers and Faxes" icon={printersAndFaxesIcon} />
                    <hr />
                    <PlacesItem title="Help and Support" icon={helpIcon} />
                    <PlacesItem title="Search" icon={searchIcon} />
                    <PlacesItem title="Run..." icon={runIcon} />
                </PlacesList>
            </Body>
            <Footer>
                <SessionButton>
                    <WarningIcon src={logoffIcon} />
                    Log Off
                </SessionButton>
                <SessionButton>
                    <DangerIcon src={shutdownIcon} />
                    Turn Off Computer
                </SessionButton>
            </Footer>
        </StyledStartPanel>
    );
};
