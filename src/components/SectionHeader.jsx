import React from "react";
import "./SectionHeader.css";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
