import React from "react";
import { palette } from "../styles/GlobalStyles";

const Tooltip = ({
  top,
  right,
  left,
  bottom,
  color,
  bgColor,
  orientation = "top",
  message,
  ...restProps
}) => {
  const style = {
    top,
    right,
    bottom,
    left,
    color,
    backgroundColor: bgColor,
  };

  return (
    <span
      role="tooltip"
      style={{
        ...style,
        position: "relative",
        left: `${left}px`,
        top: `${top}px`,
        color: `${palette.gray.dark}`,
      }}
      {...restProps}
    >
      {message}
    </span>
  );
};

export default Tooltip;
