import React from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const Button = ({
  type,
  secondary = false,
  bgColor,
  fgColor,
  width,
  height,
  padding,
  marginBottom,
  fontSize,
  ...restProps
}) => {
  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
    height: height || "",
    marginBottom: marginBottom || "",
    padding: padding || "",
    fontSize: fontSize || "",
  };

  return <ButtonS type={type} style={style} {...restProps} />;
};

export default Button;

const ButtonS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.primary.blue};
  padding: 1rem;
  color: ${palette.white};
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
`;
