import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import classNames from "classnames";
import { closeColorForm, setDocColor } from "@/redux/reducers/colorSlice";

const colors = [
  "#E5E4E2",
  "#faaa73",
  "#fef595",
  "#bbf7d0",
  "#bae6fd",
  "#fecaca",
];

const ColorPopup = () => {
  const dispatch = useAppDispatch();
  const { docColor } = useAppSelector((state: any) => state.color);
  const [color, setColor] = useState(docColor);

  const handleCloseForm = () => {
    dispatch(closeColorForm());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setDocColor(color));
    handleCloseForm();
  };

  return (
    <div
      className={classNames({
        "fixed top-0 left-0 w-full h-full z-[100000]": true,
        "flex items-center justify-center": true,
        "bg-gray-800 bg-opacity-50": true,
      })}
    >
      <div className="relative bg-white rounded-lg p-4 shadow-lg w-fit dark:bg-neutral-800">
        {/* Close Button... */}
        <button
          className={classNames({
            "absolute top-1 right-1": true,
            "inline-flex items-center": true,
            "rounded-lg text-sm p-1.5 ml-auto": true,
            "hover:bg-gray-200 hover:text-gray-900": true,
            "text-gray-400 bg-transparent": true,
            "dark:hover:bg-gray-800 dark:hover:text-white": true,
          })}
          onClick={handleCloseForm}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        {/* Popup Header - Label, color, pin */}
        <div className="border-b rounded-t dark:border-gray-600 flex justify-between items-center">
          <div className="px-2 py-4 flex gap-2">
            <img
              src={"/palette.png"}
              className="dark:invert w-6 h-6 mt-[0.125rem]"
            />
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
              Select Color
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap w-[15rem] gap-6 mt-4">
          {colors.map((el, i) => {
            return (
              <div
                key={i}
                onClick={() => setColor(el)}
                className={classNames({
                  "w-12 h-12": true,
                  "rounded-lg p-4 cursor-pointer": true,
                  "border-[3px] border-[#37474f] dark:border-[#e8e8e8]":
                    el === color,
                })}
                style={{ backgroundColor: el }}
              />
            );
          })}
        </div>
        {/* Submit... */}
        <div className="mt-4 w-full flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className={classNames({
              "px-4 py-2 rounded-md focus:outline-none border": true,
              "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                true,
              "hover:!bg-transparent hover:text-primary hover:border-primary hover:dark:text-[#e8e8e8]":
                true,
            })}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPopup;
