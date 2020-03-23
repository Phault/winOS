import React, { FC } from 'react';
import { Toolbar } from '../../../../widgets/toolbar/Toolbar';
import { GoButton } from './GoButton';
import { PathInput } from './PathInput';
import goIcon from '../../../../assets/icons/toolbar/go-normal.png';
import { Label } from './Label';

export interface AddressBarProps {
  path: string;
  onChange: (path: string) => void;
}

export const AddressBar: FC<AddressBarProps> = ({ path, onChange }) => (
  <Toolbar>
    <Label>Address</Label>
    <PathInput value={path} onChange={onChange} />
    <GoButton icon={goIcon}>Go</GoButton>
  </Toolbar>
);
