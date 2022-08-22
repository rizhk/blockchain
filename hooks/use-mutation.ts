import { DependencyList, useEffect, useState } from 'react';
import { useMounted } from './use-mounted';

export declare type MutateFunction<TData, TVariables> = (
  ...args: Parameters<MutationFunction<TData, TVariables>>
) => void;
export declare type UseMutateFunction<TData, TVariables> = {
  data: TData | undefined;
  error: any;
  loading: boolean;
  resetError: () => void;
  mutate: MutateFunction<TData, TVariables>;
  isSuccess: boolean;
};
export declare type MutationFunction<TData, TVariables> = (variables: TVariables) => Promise<TData>;

export default function useMutation<TData, TVariables>(
  mutateFn: MutationFunction<TData, TVariables>,
): UseMutateFunction<TData, TVariables> {
  const isMounted = useMounted();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [data, setData] = useState<TData>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const resetError = () => {
    setError(undefined);
  };

  const mutate = async (params: TVariables) => {
    try {
      if (isMounted()) {
        setLoading(true);
        setIsSuccess(false);
        if (error) resetError();
      }
      const fetchPromise = mutateFn(params);
      const isPromise = fetchPromise instanceof Promise;
      if (!fetchPromise || !isPromise) return { data, error, loading };
      const response = await fetchPromise;
      if (isMounted()) {
        setData(response);
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
