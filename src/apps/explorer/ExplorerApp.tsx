import React from 'react';
import { Program } from "../framework/Program.interface";
import { Explorer } from './Explorer';

export const ExplorerApp: Program<string> = {
    name: 'File Explorer',
    run: (os, args) => {
        os.windows.create({
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
            body: <Explorer os={os} />
        });
    }
};
