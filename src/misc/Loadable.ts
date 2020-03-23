import { useState, useEffect } from 'react';

export interface LoadableConfig<T, P> {
  loader: () => Promise<T>;
  loading: () => JSX.Element;
  render: (loaded: T, props: P) => JSX.Element;
}

export function Loadable<T, P = {}>(config: LoadableConfig<T, P>): React.FC<P> {
  return function LoadableComponent(props): JSX.Element {
    const [loaded, setLoaded] = useState<T | null>(null);

    useEffect(() => {
      config.loader().then(r => setLoaded(r));
    }, []);

    if (loaded) return config.render(loaded, props);

    return config.loading();
  };
}
