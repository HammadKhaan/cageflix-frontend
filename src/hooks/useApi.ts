import { useState, useEffect } from "react";

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useApi<T>(apiCall: () => Promise<T>, deps: any[] = []): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    apiCall()
      .then((result) => {
        if (!mounted) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Unknown error");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error };
}
