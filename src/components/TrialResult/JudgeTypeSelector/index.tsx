import { useState, useRef } from "react";
import useOutSideClick from "../../../hooks/useOutSideClick";
import "./style.css";

interface JudgeTypeSelectorProps {
  judgeType: string;
  setJudgeType: (type: string) => void;
}

export default function JudgeTypeSelector({
  judgeType,
  setJudgeType,
}: JudgeTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutSideClick({
    ref,
    callback: () => setIsOpen(false),
  });

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const handleJudgeTypeClick = (type: string) => {
    setJudgeType(type);
    setIsOpen(false);
  };

  return (
    <div className="judge-select-list" ref={ref}>
      <div
        className={`now-selected ${judgeType ? "" : "no-selection"}`}
        onClick={toggleOpenClose}
      >
        {judgeType ? judgeType : "판정 유형을 선택하세요."}
        {isOpen ? (
          <img src="/images/up.svg" alt="위 화살표" />
        ) : (
          <img src="/images/down.svg" alt="아래 화살표" />
        )}
      </div>
      {isOpen && (
        <ul className="judge-type-select">
          <li
            className="judge-type-option"
            onClick={() => handleJudgeTypeClick("호전성")}
          >
            호전성
          </li>
          <li
            className="judge-type-option"
            onClick={() => handleJudgeTypeClick("창의성")}
          >
            창의성
          </li>
          <li
            className="judge-type-option"
            onClick={() => handleJudgeTypeClick("이타성")}
          >
            이타성
          </li>
        </ul>
      )}
    </div>
  );
}
