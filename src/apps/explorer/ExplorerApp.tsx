import React from 'react';
import { WindowState } from '../../App';
import { WinApp } from "../framework/WinApp";
import { Explorer } from './Explorer';

export const ExplorerApp: WinApp<string> = {
    name: 'File Explorer',
    run: (os, args) => {
        os.windows.add({
            title: ExplorerApp.name,
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
            state: WindowState.Normal,
            body: <Explorer os={os} />
        });
    }
};
