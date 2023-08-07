import React, { useState } from "react";
import { styled } from "styled-components";

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
  display: flex;
  width: ${(props) => props.width || "100%"};
  height: 2.5rem;
  margin-bottom: 1rem;
`;
