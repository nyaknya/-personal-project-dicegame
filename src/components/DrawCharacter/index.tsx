import "./style.css";

export default function DrawCharacter() {
  return (
    <div className="drawcharacter-wrapper">
      <h2>
        캐릭터 뽑기 <span>※ 왼쪽 체크 인원을 기준</span>
      </h2>
      <div>
        <form>
          <div className="input-box">
            <input type="number" min="1" />
          </div>
          <button className="basic-button" type="submit">
            결과
          </button>
        </form>
      </div>
      <div className="drawcharacter-result">
        <h3>결과창</h3>
        <p>당첨자 :</p>
      </div>
    </div>
  );
}
