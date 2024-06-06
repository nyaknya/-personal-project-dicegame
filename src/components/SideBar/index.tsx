import { useState } from "react";
import "./style.css";
import CharacterItem from "./CharacterItem";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-wrap ${isOpen ? "open" : "closed"}`}>
      <div className="character-list-header">
        <h2>캐릭터 리스트</h2>
        <div className="close-button" onClick={handleToggle}>
          {isOpen ? "close" : "open"}{" "}
          <img src="/images/sidebar.svg" alt="사이드바 토글 아이콘" />
        </div>
      </div>
      <div
        className={`character-list-container ${isOpen ? "visible" : "hidden"}`}
      >
        <div className="category">
          <span>이름</span>
          <span>체력</span>
          <span>정신력</span>
          <span>호</span>
          <span>창</span>
          <span>이</span>
          <span>상태</span>
        </div>
        <div className="character-list">
          {Array.from({ length: 30 }, (_, index) => (
            <CharacterItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
