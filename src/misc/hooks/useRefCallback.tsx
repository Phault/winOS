import { useState, useCallback } from 'react';

export function useRefCallback<T>(initialValue: T): [T, (ref: T) => void] {
  const [ref, setRef] = useState(initialValue);

  const refCallback = useCallback(
    (ref: T) => {
      setRef(ref);
    },
    [setRef]
  );

  return [ref, refCallback];
}
