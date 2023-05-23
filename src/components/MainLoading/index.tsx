import React from "react";
import "./style.css";

const MainLoading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className="main-loading"></div>
    </div>
  );
};

export default MainLoading;
