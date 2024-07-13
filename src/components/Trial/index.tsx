import "./style.css";
import PeopleCounter from "./PeopleCounter";
import SelectCharacter from "./SelectCharacter";
import usePeopleCounterStore from "../../stores/usePeopleCounterStore";
import TrialCaption from "./TrialCaption";
import { useCharacterStore } from "../../stores/useCharacterStore";
import CharacterSelector from "../../components/CharacterSelector";

export default function Trial() {
  const count = usePeopleCounterStore((state) => state.count);
  const totalStats = useCharacterStore((state) => state.totalStats);

  return (
    <div className="trial-wrapper">
      <div className="trial-title">
        <div className="trial-counter">
          <h2>난관 굴림</h2>
          <PeopleCounter />
        </div>
        <TrialCaption
          count={count}
          aggressive={totalStats.aggressive}
          creativity={totalStats.creativity}
          kindness={totalStats.kindness}
        />
      </div>
      <CharacterSelector />
      <SelectCharacter />
    </div>
  );
}
