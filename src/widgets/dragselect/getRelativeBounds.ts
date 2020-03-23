export function getRelativeBounds(parent: HTMLElement, child: HTMLElement) {
  const childBounds = child.getBoundingClientRect();
  const parentBounds = parent.getBoundingClientRect();

  return {
    left: childBounds.left - parentBounds.left + parent.scrollLeft,
    top: childBounds.top - parentBounds.top + parent.scrollTop,
    width: childBounds.width,
    height: childBounds.height,
  };
}
