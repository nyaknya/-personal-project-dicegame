import { useState } from "react";

export default function useLocalStorage(key: string, initialValue: boolean) {
  const getLocalStorage = (key: string, initialValue: boolean): boolean => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  };

  const setLocalStorage = (key: string, value: boolean) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  };

  const [storedValue, setStoredValue] = useState<boolean>(() =>
    getLocalStorage(key, initialValue)
  );

  const setValue = (value: boolean) => {
    setStoredValue(value);
    setLocalStorage(key, value);
  };

  return [storedValue, setValue] as const;
}
