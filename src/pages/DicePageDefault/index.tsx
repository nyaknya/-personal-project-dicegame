import SideBar from "../../components/SideBar";
import "./style.css";
import Trial from "../../components/Trial";

export default function DicePageDefault() {
  return (
    <div className="dicepage-wrapper">
      <SideBar></SideBar>
      <div className="dicepage-content">
        <Trial></Trial>
      </div>
    </div>
  );
}
