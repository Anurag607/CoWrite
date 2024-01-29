import React from "react";
import Select from "react-select";
import { customStyles } from "@/utils/CodeEditor/customStyles";
import { languageOptions } from "@/utils/CodeEditor/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
