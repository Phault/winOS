import { Rectangle } from '../../misc/Rectangle';

export function rectangleContains(container: Rectangle, target: Rectangle) {
    if (target.left + target.width < container.left
        || target.top + target.height < container.top
        || target.left > container.left + container.width
        || target.top > container.top + container.height)
        return false;
    
    return true;
}