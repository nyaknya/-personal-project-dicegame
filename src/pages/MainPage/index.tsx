import { Link } from "react-router-dom";
import ContentBox from "../../components/ContentBox";
import "./style.css";
import { useState } from "react";

export default function Home() {
  const [diceValue, setDiceValue] = useState<number>();
  const [sliderValue, setSliderValue] = useState<number>();

  return (
    <div className="index-container">
      <h2>인덱스페이지</h2>
      <ContentBox className="basic-calculator">
        <h3>일단 기본적인 확률 계산기를 만들어볼게요.</h3>
        <div>
          <form>
            <div className="input-box">
              <input type="text" placeholder="N" value={diceValue} />
              <span>d</span>
              <input type="text" placeholder="N" value={sliderValue} />
            </div>
            <button className="basic-button">결과</button>
          </form>
        </div>
      </ContentBox>
      <ContentBox>
        <h4>결과창</h4>
        <p>결과 : </p>
        <p>판정 여부 :</p>
      </ContentBox>
    </div>
  );
}
