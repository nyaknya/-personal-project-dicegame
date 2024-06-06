import ContentBox from "../../components/ContentBox";
import "./style.css";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import calculator from "../../utils/calculator";
import { Link } from "react-router-dom";

export default function Home() {
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
    <div className="index-container">
      <h2>
        메인페이지는 아직 디자인이 안됐습니다 일단 테스트 페이지 모음이 될듯
      </h2>
      <ContentBox className="basic-calculator">
        <h3>일단 기본적인 다이스 롤러를 만들어볼게요.</h3>
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
        <p>총 합계: {total}</p>
      </ContentBox>
      <ContentBox>
        <Link to="/dicedefault" className="page-button">
          다이스 기본 페이지로 이동
        </Link>
      </ContentBox>
    </div>
  );
}
