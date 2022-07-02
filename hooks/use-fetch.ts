import { DependencyList, useEffect, useState } from 'react';
import { useMounted } from './use-mounted';

export default function useFetch<T>(fetchFn: () => Promise<T> | undefined, deps: DependencyList = []) {
  const isMounted = useMounted();
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const resetError = () => {
    setError(undefined);
  };

  useEffect(() => {
    (async function () {
      try {
        if (isMounted()) setLoading(true);
        const fetchPromise = fetchFn();
        const isPromise = fetchPromise instanceof Promise;
        if (!fetchPromise || !isPromise) return { data, error, loading };
        const response = await fetchPromise;
        if (isMounted()) setData(response);
      } catch (err: any) {
        if (isMounted()) setError(err.message);
      } finally {
        if (isMounted()) setLoading(false);
      }
    })();
  }, [JSON.stringify(deps)]);

  return { data, error, loading, resetError };
}
