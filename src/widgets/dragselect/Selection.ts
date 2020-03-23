import { createContext } from 'react';
import { EventDispatcher } from '../../misc/EventDispatcher';

export type SelectedChangeCallback = (selected: boolean) => void;

export interface SelectableConfig<T> {
  setSelected: SelectedChangeCallback;
  data: T;
}

export class Selection<T = any> {
  items = new Map<HTMLElement, SelectableConfig<T>>();
  selected = new Set<HTMLElement>();

  onItemRegistered = new EventDispatcher<HTMLElement>();

  register(item: HTMLElement, config: SelectableConfig<T>) {
    this.items.set(item, config);
    this.onItemRegistered.invoke(item);
  }

  unregister(item: HTMLElement) {
    this.removeFromSelection(item);
    this.items.delete(item);
  }

  setSelection(items: HTMLElement[]) {
    this.clearSelection();
    this.selected = new Set(items);
    this.selected.forEach(item => this.items.get(item)!.setSelected(true));
  }

  addToSelection(item: HTMLElement) {
    this.selected.add(item);
    this.items.get(item)!.setSelected(true);
  }

  removeFromSelection(item: HTMLElement) {
    this.selected.delete(item);
    this.items.get(item)!.setSelected(false);
  }

  toggleSelected(item: HTMLElement) {
    const isSelected = this.selected.has(item);
    if (isSelected) this.removeFromSelection(item);
    else this.addToSelection(item);
  }

  selectAll() {
    this.selected = new Set(this.items.keys());
    for (let [item, config] of this.items) config.setSelected(true);
  }

  clearSelection() {
    for (let item of this.selected) this.items.get(item)!.setSelected(false);
    this.selected = new Set([]);
  }
}

export const SelectionContext = createContext<Selection | null>(null);
