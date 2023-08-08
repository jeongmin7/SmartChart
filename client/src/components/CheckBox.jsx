import React from "react";
import { styled } from "styled-components";

const Checkbox = ({
  disabled = false,
  checked = false,
  label,
  onChange,
  ...restProps
}) => {
  return (
    <Label style={{ fontSize: "1rem", marginBottom: "5px" }}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      {label}
    </Label>
  );
};

export default Checkbox;
const Label = styled.label`
  display: flex;
  /* margin-left: 2rem; */
`;
