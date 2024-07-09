import "./style.css";
import SideBar from "../../components/SideBar";
import Trial from "../../components/Trial";
import TrialResult from "../../components/TrialResult";
import NormalDice from "../../components/NormalDice";
import DrawCharacter from "../../components/DrawCharacter";

export default function DicePageDefault() {
  return (
    <div className="dicepage-wrapper">
      <SideBar />
      <div className="dicepage-content">
        <Trial />
        <TrialResult />
      </div>
      <div className="addition-content">
        <NormalDice />
        <DrawCharacter />
      </div>
    </div>
  );
}
