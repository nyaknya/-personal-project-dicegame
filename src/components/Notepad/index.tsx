import React, { useState, useEffect } from "react";
import "./style.css";

const NOTEPAD_STORAGE_KEY = "notepadContent";

export default function Notepad() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const savedContent = localStorage.getItem(NOTEPAD_STORAGE_KEY);
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    localStorage.setItem(NOTEPAD_STORAGE_KEY, newContent);
  };

  return (
    <div className="notepad-container">
      <h2>메모장</h2>
      <textarea
        className="notepad-textarea"
        value={content}
        onChange={handleChange}
        placeholder="여기에 메모를 작성하세요..."
      />
    </div>
  );
}
