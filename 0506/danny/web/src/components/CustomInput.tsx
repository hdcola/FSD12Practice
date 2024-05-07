import React from "react";

interface CustomInputProps {
  options: string[];
  onInputChange: (value: string) => void;
}

export default function CustomInput({
  options,
  onInputChange,
}: CustomInputProps) {
  const [value, setValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInputChange(newValue);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      e.target.value = "";
    }
  };

  return (
    <div>
      <input
        style={{ width: "400px" }}
        type="text"
        list="customOptions"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <datalist id="customOptions">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </div>
  );
}
