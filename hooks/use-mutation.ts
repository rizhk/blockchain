import { DependencyList, useEffect, useState } from 'react';
import { useMounted } from './use-mounted';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export default function useMutation<T>(mutateFn: (...args: any) => Promise<T> | undefined, deps?: DependencyList) {
  const isMounted = useMounted();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const resetError = () => {
    setError(undefined);
  };

  const mutate = async (params: ArgumentTypes<typeof mutateFn>) => {
    try {
      if (isMounted()) {
        setLoading(true);
        setIsSuccess(false);
      }
      const fetchPromise = mutateFn(params);
      const isPromise = fetchPromise instanceof Promise;
      if (!fetchPromise || !isPromise) return { data, error, loading };
      const response = await fetchPromise;
      if (isMounted()) {
        setData(response);
        if (error) resetError();
        setIsSuccess(true);
      }
    } catch (err: any) {
      if (isMounted()) setError(err.message);
    } finally {
      if (isMounted()) setLoading(false);
    }
  };

  return { data, error, loading, resetError, mutate, isSuccess };
}
