import { useEffect } from 'react';

export function useGlobalListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    document.addEventListener(type, listener, options);
    return () => document.removeEventListener(type, listener, options);
  }, [type, listener, options]);
}
