import { Link } from "react-router-dom";
import ContentBox from "../../components/ContentBox";
import "./style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import calculator from "../../utils/calculator";

export default function Home() {
  const [diceValue, setDiceValue] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [results, setResults] = useState<number[]>([]);

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

  return (
    <div className="index-container">
      <h2>인덱스페이지</h2>
      <ContentBox className="basic-calculator">
        <h3>일단 기본적인 확률 계산기를 만들어볼게요.</h3>
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
      </ContentBox>
      <ContentBox>
        <h4>결과창</h4>
        <p>결과 : {results.join(", ")}</p>
      </ContentBox>
    </div>
  );
}
