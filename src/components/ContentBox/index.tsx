import React, { ReactNode } from "react";
import "./style.css";

interface ContentBoxProps {
  children: ReactNode;
  className?: string;
}

export default function ContentBox({ children, className }: ContentBoxProps) {
  return <div className={`content-box ${className}`}>{children}</div>;
}
