import React from "react";

import "./card.scss";

export const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};
