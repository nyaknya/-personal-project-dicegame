import "./style.css";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import calculator from "../../utils/calculator";

export default function NormalDice() {
  const [diceValue, setDiceValue] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  const handleDiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiceValue(Number(e.target.value));
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = calculator(diceValue, sliderValue);
    setResults(result);
  };

  useEffect(() => {
    const sum = results.reduce((acc, curr) => acc + curr, 0);
    setTotal(sum);
  }, [results]);

  return (
    <div className="normaldice-wrapper">
      <h2>일반 다이스 굴림</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="number"
              value={diceValue}
              onChange={handleDiceChange}
              min="1"
            />
            <span>d</span>
            <input
              type="number"
              value={sliderValue}
              onChange={handleSliderChange}
              min="1"
            />
          </div>
          <button className="basic-button" type="submit">
            결과
          </button>
        </form>
      </div>
      <div className="normaldice-result">
        <h3>결과창</h3>
        <p>결과 : {results.join(", ")}</p>
        <p>총 합계: {total}</p>
      </div>
    </div>
  );
}
