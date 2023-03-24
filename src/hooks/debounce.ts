import {useState, useEffect} from 'react';

export const useDebounce = <T extends unknown>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [value]);

  return debouncedValue;
};
