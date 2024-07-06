import "./style.css";
import PeopleCounter from "./PeopleCounter";
import SelectCharacter from "./SelectCharacter";
import usePeopleCounterStore from "../../stores/usePeopleCounterStore";
import TrialCaption from "./TrialCaption";

export default function Trial() {
  const count = usePeopleCounterStore((state) => state.count);

  return (
    <div className="trial-wrapper">
      <div className="trial-title">
        <div className="trial-counter">
          <h2>난관 굴림</h2>
          <PeopleCounter />
        </div>
        <TrialCaption
          count={count}
          aggressive={0}
          creativity={0}
          kindness={0}
        />
      </div>
      <SelectCharacter />
    </div>
  );
}
