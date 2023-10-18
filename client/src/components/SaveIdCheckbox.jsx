import React from "react";
import Checkbox from "./CheckBox";
import Tooltip from "./ToolTip";

const SaveIdCheckbox = ({
  label = "아이디 저장",
  checked,
  disabled,
  orientation = "top",
  message = "개인 정보 보호를 위해 본인 기기에서만 이용해주세요",
  onChange,
  ...restProps
}) => {
  return (
    <>
      <Checkbox
        label={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      {checked && (
        <Tooltip
          left={20}
          top={0}
          orientation={orientation}
          message={message}
        />
      )}
    </>
  );
};

export default SaveIdCheckbox;
