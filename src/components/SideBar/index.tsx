export default function SideBar() {
  return (
    <>
      <h2>캐릭터 리스트</h2>
      <div className="close-button">
        close <img src="/images/sidebar.svg" alt="사이드바 토글 아이콘" />
      </div>
      <div className="character-list-wrap">
        <div className="category">
          <h3>이름</h3>
          <h3>체력</h3>
          <h3>정신력</h3>
          <h3>호</h3>
          <h3>창</h3>
          <h3>이</h3>
          <h3>상태</h3>
        </div>
        <div className="character-list">
          <div>각 캐릭터 리스트 컴포넌트</div>
        </div>
      </div>
    </>
  );
}
