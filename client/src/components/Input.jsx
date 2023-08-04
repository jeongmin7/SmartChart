import React, { useState } from "react";
import { styled } from "styled-components";

const Input = ({
  id,
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
    <Container>
      <Wrapper>
        <InputStyle
          id={id}
          type={id ? id : "text"}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
      </Wrapper>
      {errorProp && <span role="alert">{errorProp.message}</span>}
    </Container>
  );
};

export default Input;
const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
`;

const InputStyle = styled.input`
  display: flex;
  width: 80%;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
`;
