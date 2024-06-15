import "./style.css";
import ParticipationCharacter from "../ParticipationCharacter";
import usePeopleCounterStore from "../../../stores/usePeopleCounterStore";

export default function SelectCharacter() {
  const count = usePeopleCounterStore((state) => state.count);

  return (
    <div className="trial-select">
      <div className="select-category">
        <input type="checkbox" />
        <span className="name">캐릭터 이름</span>
        <div className="stats">
          <span>호전성</span>
          <span>창의성</span>
          <span>이타성</span>
        </div>
        <span className="debuff">상태</span>
        <span className="equipment">장착한 장비</span>
      </div>
      <div className="select-content">
        {Array.from({ length: count }, (_, index) => (
          <ParticipationCharacter key={index} />
        ))}
      </div>
    </div>
  );
}
