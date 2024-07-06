import { useState, useEffect } from "react";
import "./style.css";

interface StatsCounterProps {
  initial: number;
  current: number;
  onValueChange?: (value: number) => void;
}

export default function StatsCounter({
  initial,
  current,
  onValueChange,
}: StatsCounterProps) {
  const [count, setCount] = useState<number>(initial);

  useEffect(() => {
    setCount(current);
  }, [current]);

  const handleChange = (delta: number) => {
    const newCount = count + delta;
    setCount(newCount);
    if (onValueChange) onValueChange(newCount);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setCount(value);
      if (onValueChange) onValueChange(value);
    }
  };

  return (
    <div className="stats-counter">
      <button className="counter-button" onClick={() => handleChange(-1)}>
        <img src="/images/minus.svg" alt="마이너스 아이콘" />
      </button>
      <input
        className="counter-number"
        type="number"
        value={count}
        onChange={handleInputChange}
      />
      <button className="counter-button" onClick={() => handleChange(1)}>
        <img src="/images/plus.svg" alt="플러스 아이콘" />
      </button>
    </div>
  );
}
