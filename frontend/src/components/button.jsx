import React from "react";

import "./button.scss";

export const Button = (props) => {
  return <button {...props} className={`button ${props.className}`} />;
};
