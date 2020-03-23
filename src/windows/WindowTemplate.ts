import { Rectangle } from '../misc/Rectangle';
import { Size } from '../misc/Size';
import { ReactNode } from 'react';
import { MetaWindow } from './MetaWindow';

export interface WindowTemplate {
  title: string;
  icon?: string;
  parentId?: number;
  rect?: Rectangle;
  minSize?: Size;
  maxSize?: Size;
  isResizable?: boolean;
  body: (window: MetaWindow) => ReactNode;
}
