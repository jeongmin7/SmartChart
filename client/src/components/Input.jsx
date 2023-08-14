import React, { useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const Input = ({
  id,
  width,
  name = "",
  labelVisible,
  email,
  password,
  placeholder = "",
  disabled,
  value,
  error: errorProp,
  className = "",
  onChange,
  marginBottom,
  height,
  position,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(value ? value : "");
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };
  return (
    <>
      <InputStyle
        id={id}
        type={id ? id : "text"}
        name={name}
        width={width}
        placeholder={placeholder}
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        marginBottom={marginBottom}
        height={height}
        position={position}
        {...restProps}
      />
      {errorProp && <span role="alert">{errorProp.message}</span>}
    </>
  );
};

export default Input;

// const Container = styled.div`
//   width: ${(props) => props.width || "100%"};
// `;

const InputStyle = styled.input`
  position: ${(props) => props.position && props.position};
  display: flex;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "2.5rem"};
  margin-bottom: ${(props) => props.marginBottom || "1rem"};
  border: 1px solid ${palette.gray.border};
  border-radius: 6px;
`;
