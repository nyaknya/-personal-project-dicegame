import { Link } from "react-router-dom";
import ContentBox from "../../components/ContentBox";
import "./style.css";

export default function Home() {
  return (
    <div className="index-container">
      <h2>인덱스페이지</h2>
      <ContentBox>
        <Link to="/dicedefault" className="page-button">
          기본 다이스 페이지
        </Link>
      </ContentBox>
    </div>
  );
}
