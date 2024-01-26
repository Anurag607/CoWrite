import React from "react";
import classnames from "classnames";
import { useAppDispatch } from "@/redux/hooks";
import { openForm } from "@/redux/reducers/formSlice";

const FAB = () => {
  const dispatch = useAppDispatch();

  const handleOpenForm = () => {
    dispatch(openForm());
  };

  return (
    <button
      onClick={handleOpenForm}
      className={classnames({
        "fixed bottom-10 right-10 z-[10000]": true,
        "p-4 rounded-full shadow-lg": true,
        "bg-primary text-white hover:bg-hover dark:text-gray-700": true,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
};

export default FAB;
