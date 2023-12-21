import React from "react";
import { css, styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const Button = ({
  type,
  secondary = false,
  bgColor,
  fgColor,
  width,
  height,
  padding,
  marginB,
  marginTop,
  fontSize,
  disabled,
  borderRadius,
  alignSelf,
  whiteSpace,
  fontweight,
  onClick,
  ...restProps
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick && onClick();
    }
  };
  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
    height: height || "",
    marginBottom: marginB || "",
    marginTop: marginTop || "",
    padding: padding || "",
    fontSize: fontSize || "",
    borderRadius: borderRadius || "",
    alignSelf: alignSelf || "",
    whiteSpace: whiteSpace || "",
    fontweight: fontweight || "",
  };

  return (
    <ButtonS
      type={type}
      style={style}
      {...restProps}
      disabled={disabled}
      onClick={handleClick}
    />
  );
};

export default Button;

const ButtonS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.primary.blue};
  padding: 1rem;
  color: ${palette.white};
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      background-color: #ccc;
      color: #999;
      cursor: not-allowed;
    `}
`;
