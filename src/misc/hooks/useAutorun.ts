import { useEffect, DependencyList } from 'react';
import { autorun } from 'mobx';

export function useAutorun(reaction: () => any, deps?: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => autorun(reaction), [reaction, ...deps]);
}
