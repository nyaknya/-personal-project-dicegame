import { useState, useCallback } from "react";

export function useKeyboardNavigation(
  length: number,
  onEnter: (index: number) => void
) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prevIndex) =>
          prevIndex < length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "Enter") {
        onEnter(activeIndex);
      }
    },
    [length, activeIndex, onEnter]
  );

  return { activeIndex, handleKeyDown };
}
