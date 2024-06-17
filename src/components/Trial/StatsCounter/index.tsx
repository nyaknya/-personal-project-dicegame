import { useState } from "react";
import "./style.css";

interface StatsCounterProps {
  initial: number;
}

export default function StatsCounter({ initial }: StatsCounterProps) {
  const [count, setCount] = useState<number>(initial);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setCount(value);
    }
  };

  return (
    <div className="stats-counter">
      <button className="counter-button" onClick={handleDecrement}>
        <img src="/images/minus.svg" alt="마이너스 아이콘" />
      </button>
      <input
        className="counter-number"
        type="number"
        value={count}
        onChange={handleInputChange}
      />
      <button className="counter-button" onClick={handleIncrement}>
        <img src="/images/plus.svg" alt="플러스 아이콘" />
      </button>
    </div>
  );
}
