import { Rectangle } from '../../misc/Rectangle';
import { rectangleContains } from './rectangleContains';
import { getRelativeBounds } from './getRelativeBounds';

export function checkCollision(
  parent: HTMLElement,
  children: IterableIterator<HTMLElement>,
  selection: Rectangle
) {
  const collisions: HTMLElement[] = [];

  for (let child of children) {
    const childBounds = getRelativeBounds(parent, child);

    if (rectangleContains(selection, childBounds)) collisions.push(child);
  }

  return collisions;
}
