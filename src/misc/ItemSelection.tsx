import { decorate, observable, action } from 'mobx';

class ItemSelection<T> {
    current: T[];

    constructor(initial: T[] = []) {
        this.current = initial;
    }

    toggle(target: T): boolean {
        const newState = !this.has(target);
        this.setSelected(target, newState);
        return newState;
    }

    set(target: T | T[]) {
        this.current = Array.isArray(target) ? target : [target];
    }

    setSelected(target: T, selected: boolean = true) {
        const currentState = this.has(target);

        if (currentState === selected)
            return;

        if (selected)
            this.current.push(target);
        else
            this.current.splice(this.current.indexOf(target), 1);
    }
    
    has(target: T): boolean {
        return this.current.includes(target);
    }

    clear() {
        this.current = [];
    }
}

decorate(ItemSelection, {
    current: observable,
    toggle: action,
    set: action,
    setSelected: action,
    clear: action,
});

export { ItemSelection };