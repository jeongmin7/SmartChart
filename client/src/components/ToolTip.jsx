import React from "react";

const Tooltip = ({
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
  color = "",
  bgColor = "",
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
    <span role="tooltip" style={style} {...restProps}>
      {message}
    </span>
  );
};

export default Tooltip;
