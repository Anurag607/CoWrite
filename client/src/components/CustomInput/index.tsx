import React from "react";
import classNames from "classnames";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classNames({
          "focus:outline-none w-full  px-4 py-2 bg-white mt-2": true,
          "border-2 border-black z-10 rounded-md": true,
          "shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:shadow transition duration-200":
            true,
        })}
      />
    </>
  );
};

export default CustomInput;
