import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { FC, useRef, Fragment, useContext } from "react";
import { MenuBar } from "../../widgets/menubar/MenuBar";
import { Item, Separator } from "react-contexify";
import { WindowContext } from "../../windows/WindowManager";
import { Minefield } from './views/Minefield';
import { Counter } from './views/Counter';
import { DifficultyPresets, Difficulty } from './DifficultyPresets';
import { Observer } from 'mobx-react-lite';
import { Game, GameState } from './Game';
import { Cell } from './Cell';
import { AutoRefresh } from './utils/AutoRefresh';
import { SmileyState, ResetButton } from './views/ResetButton';
import { useGlobalListener } from './utils/useGlobalListener';
import { MenuBarMenu } from '../../widgets/menubar/MenuBarMenu';
import styled, { ThemeProvider } from 'styled-components/macro';
import { ColorlessTheme } from './ColorlessTheme';
import { DefaultTheme } from './DefaultTheme';
import { Scoreboard } from './views/Scoreboard';
import { Options } from './Options';
import { DefaultOptions } from './DefaultOptions';

const StyledMinesweeper = styled.div`
    margin: 4px 0 0 3px;
    padding: 6px;
    background: ${props => props.theme.background};
    width: fit-content;
`;

export const Minesweeper: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const window = useContext(WindowContext)!;

    const [gameOptions, setGameOptions] = useState<Options>(DefaultOptions);
    const [game, setGame] = useState(() => new Game(0, 0, 0));

    const reset = useCallback(() => {
        let difficulty = gameOptions.difficulty === Difficulty.Custom 
            ? gameOptions.customDifficulty 
            : DifficultyPresets.get(gameOptions.difficulty)!;
        setGame(new Game(difficulty.width, difficulty.height, difficulty.mines));
    }, [setGame, gameOptions.difficulty, gameOptions.customDifficulty]);

    useEffect(reset, [gameOptions.difficulty, gameOptions.customDifficulty]);

    const cellMouseDown = useCallback((e: React.MouseEvent, cell: Cell, x: number, y: number) => {
        if (game.state === GameState.Ended)
            return;

        switch (e.button) {
            case 2:
                game.cycleMarker(cell, gameOptions.unknownMarkEnabled);
                break;
        }
    }, [game, gameOptions]);

    const cellMouseUp = useCallback((e: React.MouseEvent, cell: Cell, x: number, y: number) => {
        if (game.state === GameState.Ended)
            return;

        switch (e.button) {
            case 0:
                game.revealCell(x, y);
                break;
        }
    }, [game]);

    const [aboutToClick, setAboutToClick] = useState(false);

    const mouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button === 0)
            setAboutToClick(true);
    }, [setAboutToClick]);
    
    useGlobalListener('mouseup', e => {
        if (e.button === 0) 
            setAboutToClick(false)
    });

    useLayoutEffect(() => {
        window.rect.width = ref.current!.getBoundingClientRect().right - window.rect.left + 5;
        window.rect.height = ref.current!.getBoundingClientRect().bottom - window.rect.top + 5;
    }, [ref.current, game.width, game.height]);

    return (
        <Fragment>
            <MenuBar>
                <MenuBarMenu label='Game'>
                    <Item onClick={reset}>New</Item>
                    <Separator />
                    <Item onClick={() => setGameOptions(prev => ({...prev, difficulty: Difficulty.Beginner}))}>Beginner</Item>
                    <Item onClick={() => setGameOptions(prev => ({...prev, difficulty: Difficulty.Intermediate}))}>Intermediate</Item>
                    <Item onClick={() => setGameOptions(prev => ({...prev, difficulty: Difficulty.Expert}))}>Expert</Item>
                    <Item disabled>Custom...</Item>
                    <Separator />
                    <Item onClick={() => setGameOptions(prev => ({...prev, unknownMarkEnabled: !prev.unknownMarkEnabled}))}>Marks (?)</Item>
                    <Item onClick={() => setGameOptions(prev => ({...prev, colorEnabled: !prev.colorEnabled}))}>Color</Item>
                    <Item disabled onClick={() => setGameOptions(prev => ({...prev, soundEnabled: !prev.soundEnabled}))}> Sound</Item>
                    <Separator />
                    <Item disabled>Best Times...</Item>
                    <Separator />
                    <Item onClick={() => window.destroy()}>Exit</Item>
                </MenuBarMenu>

                <MenuBarMenu label='Help'>
                    <Item disabled>Contents</Item>
                    <Item disabled>Search for Help on...</Item>
                    <Item disabled>Using Help</Item>
                    <Separator />
                    <Item disabled>About Minesweeper...</Item>
                </MenuBarMenu>
            </MenuBar>

            <ThemeProvider theme={gameOptions.colorEnabled ? DefaultTheme : ColorlessTheme}>
                <StyledMinesweeper ref={ref} onMouseDown={mouseDown}>
                    <Scoreboard>
                        <Observer>{() => <Counter value={game.mineCount - game.flagsPlaced} />}</Observer>
                        <Observer>
                            {() => {
                                let smileyState: SmileyState = aboutToClick ? 'surprised' :'normal';
                                if (game.state === GameState.Ended)
                                    smileyState = game.cellsLeft > 0 ? 'dead' : 'cool';
                                
                                return <ResetButton state={smileyState} onClick={reset} />;
                            }}
                        </Observer>
                        <AutoRefresh interval={200} render={() => <Counter value={Math.ceil(game.time / 1000)} />} />
                    </Scoreboard>
                    <Minefield grid={game.minefield} onMouseDown={cellMouseDown} onMouseUp={cellMouseUp} />
                </StyledMinesweeper>
            </ThemeProvider>
        </Fragment>
    );
};


