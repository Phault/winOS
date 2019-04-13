import React, { useContext, CSSProperties, MutableRefObject } from 'react';
import { OSContext } from '../App';
import { Icon } from '../widgets/Icon';
import fallbackIcon from '../assets/icons/apps/default.png';
import classNames from 'classnames';
import myDocumentsIcon from '../assets/icons/filetypes/folder-documents.png';
import myRecentDocumentsIcon from '../assets/icons/filetypes/folder-recent.png';
import myPictures from '../assets/icons/filetypes/folder-pictures.png';
import myMusicIcon from '../assets/icons/filetypes/folder-music.png';
import myComputerIcon from '../assets/icons/computer.png';
import searchIcon from '../assets/icons/search.png';
import helpIcon from '../assets/icons/help.png';
import runIcon from '../assets/icons/run.png';
import connectToIcon from '../assets/icons/connect.png';
import printersAndFaxesIcon from '../assets/icons/printers-and-faxes.png';
import controlPanelIcon from '../assets/icons/apps/control-panel.png';
import internetExplorerIcon from '../assets/icons/apps/internet-explorer.png';
import outlookIcon from '../assets/icons/apps/outlook.png';
import programAccessIcon from '../assets/icons/program-access.png';
import { Program } from '../Program.interface';
import { ExplorerApp } from '../apps/explorer';

interface ProgListItemProps {
    title: string;
    subtitle?: string;
    icon?: string;
    onClick?: () => void;
    className?: string;
}

const ProgListItem: React.FC<ProgListItemProps> = ({title, subtitle, icon, onClick, className}) => {
    return (
        <div className={classNames("proglist-item", className)} onClick={onClick}>
            <Icon src={icon || fallbackIcon} />
            <div className="content">
                <h1>{title}</h1>
                {subtitle ? <p>{subtitle}</p> : null}
            </div>
        </div>
    );
}

export interface StartPanelProps {
    onClose: () => void;
    className?: string;
    style?: CSSProperties;
}

const StartPanel: React.FC<StartPanelProps> = ({ onClose, className, ...rest }) => {
    const { programManager, processManager } = useContext(OSContext)!;

    function run(program: Program) {
        processManager.run(program);
        onClose();
    }

    const programs = programManager.installed.map((p, i) => (
        <ProgListItem key={i} title={p.name} icon={p.icon} onClick={() => run(p)}/>
    ));

    return (
        <div className={classNames("start-panel", className)} {...rest}>
            <div className="start-panel-header">
                Administrator
                </div>
            <div className="start-panel-body">
                <div className="proglist">
                    <ProgListItem title="Internet" subtitle="Internet Explorer" icon={internetExplorerIcon} />
                    <ProgListItem title="E-mail" subtitle="Outlook Express" icon={outlookIcon} />
                    <hr />
                    {programs}
                    <div className="spacer" />
                    <hr />
                    <div className="more-programs">
                        <span>All Programs</span>
                    </div>
                </div>
                <div className="placeslist">
                    <ProgListItem title="My Documents" icon={myDocumentsIcon} className="favorite" 
                        onClick={() => processManager.run(ExplorerApp, '/Documents and Settings/Administrator/My Documents')}/>
                    <ProgListItem title="My Recent Documents" icon={myRecentDocumentsIcon} className="favorite"
                        onClick={() => processManager.run(ExplorerApp, '/Documents and Settings/Administrator/Recent')}/>
                    <ProgListItem title="My Pictures" icon={myPictures} className="favorite" 
                        onClick={() => processManager.run(ExplorerApp, '/Documents and Settings/Administrator/My Documents/My Pictures')}/>
                    <ProgListItem title="My Music" icon={myMusicIcon} className="favorite" 
                        onClick={() => processManager.run(ExplorerApp, '/Documents and Settings/Administrator/My Documents/My Music')}/>
                    <ProgListItem title="My Computer" icon={myComputerIcon} className="favorite"
                        onClick={() => processManager.run(ExplorerApp, '/')} />
                    <hr />
                    <ProgListItem title="Control Panel" icon={controlPanelIcon} />
                    <ProgListItem title="Set Program Access and Defaults" icon={programAccessIcon} />
                    <ProgListItem title="Connect To" icon={connectToIcon} />
                    <ProgListItem title="Printers and Faxes" icon={printersAndFaxesIcon} />
                    <hr />
                    <ProgListItem title="Help and Support" icon={helpIcon} />
                    <ProgListItem title="Search" icon={searchIcon} />
                    <ProgListItem title="Run..." icon={runIcon} />
                    <div className="spacer" />
                </div>
            </div>
            <div className="start-panel-footer">
                <div className="start-panel-footer-btn btn-logoff">
                    Log Off
                    </div>
                <div className="start-panel-footer-btn btn-shutdown">
                    Shut Down
                    </div>
            </div>
        </div>
    );
};

export { StartPanel };