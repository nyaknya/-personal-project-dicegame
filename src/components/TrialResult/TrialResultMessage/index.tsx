import React from "react";
import "./style.css";

interface TrialResultMessageProps {
  detailedResult: string;
  copyResult: string;
  isSuccess: boolean; // 추가
}

export default function TrialResultMessage({
  detailedResult,
  copyResult,
  isSuccess, // 추가
}: TrialResultMessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyResult).then(() => {
      alert("결과가 복사되었습니다.");
    });
  };

  return (
    <div className="trial-result-message-container">
      <div className="result-section">
        <div className="result-title">
          <h2>판정 결과</h2>
          <span
            className={`result-status ${isSuccess ? "success" : "failure"}`}
          >
            {isSuccess ? "성공" : "실패"}
          </span>
        </div>
        <div className="result-content">
          {detailedResult.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="copy-section">
        <div className="copy-title">
          <h2>복사용</h2>
          <button className="copy-button" onClick={handleCopy}>
            <img src="/images/copy.svg" alt="복사" />
            복사하기
          </button>
        </div>
        <div className="result-content">
          {copyResult.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
