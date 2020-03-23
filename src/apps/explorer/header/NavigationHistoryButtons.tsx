import React, { Fragment } from 'react';
import { Item, Separator } from 'react-contexify';
import * as Toolbar from '../../../widgets/toolbar';
import backIcon from '../../../assets/icons/toolbar/back.png';
import forwardIcon from '../../../assets/icons/toolbar/forward.png';
import { NavigationHistory } from '../NavigationHistory';
import { Observer } from 'mobx-react-lite';
import { Omit } from 'react-autosuggest';
import * as nodePath from 'bfs-path';

export interface NavigationHistoryDropdownProps
  extends Omit<Toolbar.DropdownProps, 'onClick'> {
  history: string[];
  onClick: (path: string, index: number) => void;
}

export function NavigationHistoryDropdown({
  history,
  onClick,
  children,
  ...rest
}: NavigationHistoryDropdownProps) {
  const items = history.map((val, i) => (
    <Item key={i} onClick={() => onClick(val, i)}>
      {nodePath.basename(val) || val}
    </Item>
  ));

  return (
    <Toolbar.Dropdown {...rest}>
      {items}
      {children}
    </Toolbar.Dropdown>
  );
}

export function NavigationHistoryButtons({
  history,
}: {
  history: NavigationHistory<string>;
}) {
  const maxItems = 9;

  return (
    <Fragment>
      <Observer>
        {() => {
          let previous = history.previousAll;
          if (previous.length > maxItems)
            previous = previous.slice(previous.length - maxItems);
          previous.reverse();

          return (
            <Toolbar.SplitButton>
              <Toolbar.Button
                icon={backIcon}
                disabled={!history.canGoBack}
                onClick={() => history.tryGoBack()}>
                Back
              </Toolbar.Button>
              <NavigationHistoryDropdown
                history={previous}
                onClick={(_path, i) =>
                  history.goToIndex(history.position - i - 1)
                }
                disabled={!history.canGoBack}>
                <Separator />
                <Item>History</Item>
              </NavigationHistoryDropdown>
            </Toolbar.SplitButton>
          );
        }}
      </Observer>

      <Observer>
        {() => {
          let next = history.nextAll;
          if (next.length > maxItems) next = next.slice(0, maxItems);

          return (
            <Toolbar.SplitButton>
              <Toolbar.Button
                icon={forwardIcon}
                disabled={!history.canGoForward}
                onClick={() => history.tryGoForward()}
              />
              <NavigationHistoryDropdown
                history={next}
                onClick={(_path, i) =>
                  history.goToIndex(history.position + i + 1)
                }
                disabled={!history.canGoForward}>
                <Separator />
                <Item>History</Item>
              </NavigationHistoryDropdown>
            </Toolbar.SplitButton>
          );
        }}
      </Observer>
    </Fragment>
  );
}
