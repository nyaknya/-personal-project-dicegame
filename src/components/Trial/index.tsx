import "./style.css";

export default function Trial() {
  return (
    <div className="trial-wrapper">
      <div className="trial-title">
        <h2>난관 굴림</h2>
        <div className="trial-people-count">카운트 들어올곳(주스탠드 활용)</div>
        <ul className="trial-caption">
          <li>참여 인원 : N명</li>
          <li>호전성 총합 : NN</li>
          <li>창의성 총합 : NN</li>
          <li>이타성 총합 : NN</li>
        </ul>
      </div>
    </div>
  );
}
