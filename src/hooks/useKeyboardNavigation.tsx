import { useState, useEffect, KeyboardEvent } from "react";

export function useKeyboardNavigation(
  listLength: number,
  onEnter: (index: number) => void
) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter(activeIndex);
    } else if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < listLength - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : listLength - 1
      );
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [listLength]);

  return { activeIndex, handleKeyDown };
}
