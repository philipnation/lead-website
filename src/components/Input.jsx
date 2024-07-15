import React from "react";

const Input = ({
  labelName,
  inputType,
  value,
  onChangeEvent,
  placeholder,
  style,
  width,
  minWidth,
  labelStyle,
  required,
}) => {
  return (
    <div
      className={`flex flex-col ${minWidth ? `w-[${minWidth}]` : "w-[100%]"} ${
        width ? `lg:w-[${width}]` : "lg:w-[30%]"
      }   gap-2 mt-3`}
    >
      {labelName && (
        <label className={`text-[14px] font-[500] text-[#000] ${labelStyle}`} htmlFor="">
          {labelName}
        </label>
      )}
      <input
        pattern={inputType == "date" ? "d{4}/d{2}/d{2}" : null}
        required={required}
        type={inputType}
        className={`rounded-[12px] p-[14px] w-full text-[#000] mt-1.3 border-[1px] text-[12px] focus:outline-none ${style}`}
        placeholder={placeholder}
        value={value}
        onChange={onChangeEvent}
      />
    </div>
  );
};

export default Input;
