import React from "react";
import { styled } from "styled-components";

const Button = ({
  type = "button",
  secondary = false,
  bgColor,
  fgColor,
  width,
  height,
  marginBottom,
  ...restProps
}) => {
  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
    height: height || "",
    marginBottom: marginBottom || "",
  };

  return <ButtonS type={type} style={style} {...restProps} />;
};

export default Button;

const ButtonS = styled.div`
  display: flex;
  justify-content: center;
  background-color: #97a6e0;
  padding: 1rem;
  color: white;
  border-radius: 30px;
  font-weight: 600;
`;
