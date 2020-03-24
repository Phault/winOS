import { observable, action, computed } from 'mobx';

export class NavigationHistory<T> {
  @observable stack: T[];
  @observable position: number;

  constructor(start: T) {
    this.stack = [start];
    this.position = 0;
  }

  @action
  push(val: T) {
    this.stack.splice(
      this.position + 1,
      Math.max(0, this.stack.length - this.position - 1),
      val
    );
    this.position = this.stack.length - 1;
  }

  @action
  clear() {
    this.goToIndex(0);
    this.stack = [this.stack[0]];
  }

  @action
  tryGoBack() {
    if (this.canGoBack) this.position--;
  }

  @action
  tryGoForward() {
    if (this.canGoForward) this.position++;
  }

  @action
  goTo(val: T) {
    const index = this.stack.indexOf(val);
    this.goToIndex(index);
  }

  @action
  goToIndex(index: number) {
    if (index < 0 || index >= this.stack.length) throw new RangeError();

    this.position = index;
  }

  @computed
  get current() {
    return this.stack[this.position];
  }

  @computed
  get previous() {
    if (this.canGoBack) return this.stack[this.position - 1];

    return null;
  }

  @computed
  get next() {
    if (this.canGoForward) return this.stack[this.position + 1];

    return null;
  }

  @computed
  get previousAll() {
    return this.stack.slice(0, this.position);
  }

  @computed
  get nextAll() {
    return this.stack.slice(this.position + 1);
  }

  @computed
  get canGoBack() {
    return this.position > 0;
  }

  @computed
  get canGoForward() {
    return this.position < this.stack.length - 1;
  }
}
