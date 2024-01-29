import React from "react";
import classNames from "classnames";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input ...`}
        className={classNames({
          "h-full w-full px-4 py-2 bg-neutral-600 mt-2": true,
          "bound z-10 text-[#ffffff] rounded-md resize-none": true,
          "shadow-md shadow-neutral-800 transition duration-200": true,
        })}
      />
    </>
  );
};

export default CustomInput;
