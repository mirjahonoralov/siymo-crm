import React from "react";
import "./style.css";

const Loading: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <svg viewBox="25 25 50 50" className="loading-svg">
      <circle
        className={`small-loading ${color ? color : "white"}`}
        cx="50"
        cy="50"
        r="20"
      ></circle>
    </svg>
  );
};

export default Loading;
