import { useState, useCallback } from "react";

type FetchFunction<T, P> = (params?: P) => Promise<T>;

interface UseFetchResult<T, P> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  refetch: (params?: P) => void;
}

function useFetch<T, P = void>(fetchFunction: FetchFunction<T, P>): UseFetchResult<T, P> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (params?: P) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(params);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFunction]
  );

  return { isLoading, data, error, refetch: fetchData };
}

export default useFetch;
