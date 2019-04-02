import { decorate, observable, action, computed } from "mobx";

class NavigationHistory<T> {
    stack: T[];
    position: number;

    constructor(start: T) {
        this.stack = [start];
        this.position = 0;
    }

    push(val: T) {
        if (this.position < this.stack.length - 1)
            this.stack = this.stack.splice(0, this.position);

        this.stack.push(val);
        this.position = this.stack.length - 1;
    }

    clear() {
        this.goToIndex(0);
        this.stack = [this.stack[0]];
    }

    tryGoBack() {
        if (this.canGoBack)
            this.position--;
    }

    tryGoForward() {
        if (this.canGoForward)
            this.position++;
    }

    goTo(val: T) {
        const index = this.stack.indexOf(val);
        this.goToIndex(index);
    }

    goToIndex(index: number) {
        if (index < 0 || index >= this.stack.length)
            throw new RangeError();

        this.position = index;
    }

    get current() {
        return this.stack[this.position];
    }

    get previous() {
        if (this.canGoBack)
            return this.stack[this.position - 1];
    }
    
    get next() {
        if (this.canGoForward)
            return this.stack[this.position + 1];
    }

    get previousAll() {
        return this.stack.slice(0, this.position);
    }

    get nextAll() {
        return this.stack.slice(this.position + 1);
    }

    get canGoBack() {
        return this.position > 0;
    }

    get canGoForward() {
        return this.position < this.stack.length - 1;
    }
}

decorate(NavigationHistory, {
    stack: observable,
    position: observable,
        
    canGoBack: computed,
    canGoForward: computed,
    current: computed,
    next: computed,
    nextAll: computed,
    previous: computed,
    previousAll: computed,

    push: action,
    clear: action,
    tryGoBack: action,
    tryGoForward: action,
    goTo: action,
    goToIndex: action
});

export { NavigationHistory };