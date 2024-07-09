import "./style.css";
import { useState } from "react";
import { useCharacterStore } from "../../stores/useCharacterStore";

export default function DrawCharacter() {
  const [numOfDraws, setNumOfDraws] = useState(1);
  const [result, setResult] = useState<string[]>([]);
  const characterStates = useCharacterStore((state) => state.characterStates);

  const handleDraw = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCharacters = characterStates
      .filter((state) => state.isSelected && state.character)
      .map((state) => state.character!.name);

    if (selectedCharacters.length === 0) {
      setResult(["No characters selected"]);
      return;
    }

    const draws = [];
    for (let i = 0; i < numOfDraws; i++) {
      const randomIndex = Math.floor(Math.random() * selectedCharacters.length);
      draws.push(selectedCharacters[randomIndex]);
    }
    setResult(draws);
  };

  return (
    <div className="drawcharacter-wrapper">
      <h2>
        캐릭터 뽑기 <span>※ 왼쪽 체크 인원을 기준</span>
      </h2>
      <div>
        <span className="drawcharacter-caption">선정 인원</span>
        <form onSubmit={handleDraw}>
          <div className="input-box">
            <input
              type="number"
              min="1"
              value={numOfDraws}
              onChange={(e) => setNumOfDraws(parseInt(e.target.value))}
            />
          </div>
          <button className="basic-button" type="submit">
            결과
          </button>
        </form>
      </div>
      <div className="drawcharacter-result">
        <h3>결과창</h3>
        <p>당첨자 :</p>
        <ul>
          {result.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
