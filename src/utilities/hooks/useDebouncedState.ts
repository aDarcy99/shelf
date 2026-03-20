import { useEffect, useState } from "react";

type UseDebouncedStateProps<TValue> = { value: TValue; delay?: number };

/**
 * @summary React hook to delay setting value.
 * @param value Value to debounce.
 * @param delay Delay of debounced value.
 * @returns Debounced value based on delay parameter.
 */
export const useDebouncedState = <TValue>({
  value,
  delay = 300,
}: UseDebouncedStateProps<TValue>) => {
  const [debouncedValue, setDebouncedValue] = useState<TValue>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
