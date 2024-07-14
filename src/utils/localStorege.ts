export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : defaultValue;
};
