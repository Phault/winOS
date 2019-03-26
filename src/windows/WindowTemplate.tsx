import { Rectangle } from '../misc/Rectangle';
import { Size } from '../misc/Size';
import { ReactNode } from 'react';
import { WindowInstance } from './WindowInstance';

export interface WindowTemplate {
  title: string;
  icon?: string;
  parentId?: number;
  rect?: Rectangle;
  minSize?: Size;
  maxSize?: Size;
  body: (window: WindowInstance) => ReactNode;
}
