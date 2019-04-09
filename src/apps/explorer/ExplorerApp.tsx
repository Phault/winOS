import React from 'react';
import { Program } from "../framework/Program.interface";
import { Explorer } from './Explorer';
import icon from '../../assets/icons/apps/explorer.png';

export const ExplorerApp: Program<string> = {
    name: 'File Explorer',
    icon,
    run: async (os, args) => {

        const initialDir = args || '/';

        os.windowManager.create({
            title: ExplorerApp.name,
            icon,
            rect: {
                left: 200,
                top: 550,
                width: 600,
                height: 400,
            },
            minSize: {
                width: 120,
                height: 100,
            },
            body: () => <Explorer initialDir={initialDir} />
        });
    }
};
