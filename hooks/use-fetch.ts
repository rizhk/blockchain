import { DependencyList, useEffect, useState } from 'react';
import { useMounted } from './use-mounted';

/**
 *
 * @param fetchFn
 * @param deps If it is undefined, it will never auto trigger, must be triggered via the trigger function, if it is provided, it will be auto triggered when the deps change
 * @returns
 */
export default function useFetch<T>(fetchFn: () => Promise<T> | undefined, deps?: DependencyList) {
  const isMounted = useMounted();
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const resetError = () => {
    setError(undefined);
  };

  const fn = async () => {
    try {
      if (isMounted()) setLoading(true);
      const fetchPromise = fetchFn();
      const isPromise = fetchPromise instanceof Promise;
      if (!fetchPromise || !isPromise) return { data, error, loading };
      const response = await fetchPromise;
      if (isMounted()) {
        setData(response);
        if (error) resetError();
      }
    } catch (err: any) {
      if (isMounted()) setError(err.message);
    } finally {
      if (isMounted()) setLoading(false);
    }
  };

  const trigger = fn;

  useEffect(() => {
    if (!deps) return;
    fn();
  }, [JSON.stringify(deps)]);

  return { data, error, loading, resetError, trigger };
}
