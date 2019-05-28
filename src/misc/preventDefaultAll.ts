export type Handlers = {[key: string]: (e?: Event) => void};

export function preventDefaultAll(handlers: Handlers) {
  const wrappedHandlers: Handlers = {};
  
  for (let key in handlers) {
    const callback = handlers[key];
    wrappedHandlers[key] = e => {
      if (e)
        e.preventDefault();

      callback(e);
    };
  }

  return wrappedHandlers;
}