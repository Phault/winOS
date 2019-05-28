export type Handler<T> = (arg: T) => void;

export class EventDispatcher<E> { 
    private listeners: Handler<E>[] = [];
    
    invoke(event: E) { 
        for (let listener of this.listeners) {
            try {
                listener(event);
            } catch (e) {
                console.error(e);
            }
        }
    }

    register(handler: Handler<E>) { 
        this.listeners.push(handler);
    }

    unregister(handler: Handler<E>) {
        const index = this.listeners.lastIndexOf(handler);
        this.listeners.splice(index, 1);
    }
}