import "./style.css";
import PeopleCounter from "./PeopleCounter";
import SelectCharacter from "./SelectCharacter";
import usePeopleCounterStore from "../../stores/usePeopleCounterStore";

export default function Trial() {
  const count = usePeopleCounterStore((state) => state.count);

  return (
    <div className="trial-wrapper">
      <div className="trial-title">
        <div className="trial-counter">
          <h2>난관 굴림</h2>
          <PeopleCounter />
        </div>
        <ul className="trial-caption">
          <li>참여 인원 : {count}명</li>
          <li>호전성 총합 : NN</li>
          <li>창의성 총합 : NN</li>
          <li>이타성 총합 : NN</li>
        </ul>
      </div>
      <SelectCharacter />
    </div>
  );
}
