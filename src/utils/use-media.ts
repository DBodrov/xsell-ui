import React from 'react';

export function useMedia(query: string, initialState = false) {
  const [state, setState] = React.useState(initialState);
  React.useDebugValue(`\`${query}\` => ${state}`);

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    if (!mql) return;
    function onChange() {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    }

    mql.addEventListener('change', onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return state;
}
