import React, { ReactNode } from "react";
import "./style.css";

interface ContentBoxProps {
  children: ReactNode;
}

export default function ContentBox({ children }: ContentBoxProps) {
  return <div className="content-box">{children}</div>;
}
