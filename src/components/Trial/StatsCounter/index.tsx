import React, { useState, useEffect } from "react";
import "./style.css";

interface StatsCounterProps {
  initial: number;
  current: number;
  onStatChange: (value: number) => void;
}

export default function StatsCounter({
  initial,
  current,
  onStatChange,
}: StatsCounterProps) {
  const [stat, setStat] = useState(current);

  useEffect(() => {
    setStat(current);
  }, [current]);

  const handleChange = (delta: number) => {
    const newStat = stat + delta;
    setStat(newStat);
    onStatChange(newStat);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStat = parseInt(event.target.value, 10);
    if (!isNaN(newStat)) {
      setStat(newStat);
      onStatChange(newStat);
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
        value={stat}
        onChange={handleInputChange}
      />
      <button className="counter-button" onClick={() => handleChange(1)}>
        <img src="/images/plus.svg" alt="플러스 아이콘" />
      </button>
    </div>
  );
}
