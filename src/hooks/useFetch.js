import { useEffect, useState } from 'react';

// Reusable custom hook: loading, data and error are managed in one place.
export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const result = await fetchFunction();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err.message || 'Something went wrong');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
    // Dependencies are intentionally supplied by the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, setData, loading, error, refetch: async () => setData(await fetchFunction()) };
}
