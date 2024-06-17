import React, { useEffect } from "react";

interface UseOutSideClickProps {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
}

export default function useOutSideClick({
  ref,
  callback,
}: UseOutSideClickProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
}
