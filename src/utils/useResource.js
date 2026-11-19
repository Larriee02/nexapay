import { useEffect, useState } from 'react';
import { api } from './api';

export function useResource(path) {
  const [state, setState] = useState({ data: null, error: '' });
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api(path, { signal: controller.signal }).then(
      (data) => setState({ data, error: '' }),
      (error) => {
        if (!controller.signal.aborted) setState((previous) => ({ ...previous, error: error.message }));
      },
    );
    return () => controller.abort();
  }, [path, version]);
  return { ...state, refresh: () => setVersion((value) => value + 1) };
}
