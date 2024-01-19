import { useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeDeleteForm } from "@/redux/reducers/alertSlice";
import { closeUpdateForm } from "@/redux/reducers/formSlice";

const Loader = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff9b73] dark:fill-gray-900"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const Alert = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { focusedNote } = useAppSelector((state: any) => state.notes);
  return (
    <div
      className={classNames({
        "fixed top-0 left-0 w-full h-full z-[100000]": true,
        "flex items-center justify-center": true,
        "bg-gray-800 bg-opacity-50": true,
      })}
    >
      <div
        className={classNames({
          "z-[1100] relative w-[22rem] h-fit p-6": true,
          "flex flex-col justify-start items-center gap-3": true,
          "dark:bg-gray-900 bg-white rounded-lg shadow-lg": true,
          "mobile:w-[19rem] mobile:h-fit": true,
        })}
      >
        <div className={"relative flex flex-col w-full h-fit gap-2"}>
          <div
            className={
              "font-monument-400 flex justify-start items-center w-fit h-fit gap-2"
            }
          >
            <p className={"tracking-wider dark:text-[#e5e7eb] text-gray-600"}>
              Warning!
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              fill="currentColor"
              className={"translate-y-[-0.1rem] dark:invert"}
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>
          </div>
        </div>
        <div
          className={classNames({
            "relative flex flex-col w-full h-fit gap-2 p-2 rounded-lg": true,
            "bg-[#f3f4f6] text-gray-900": true,
            "dark:text-[#f3f4f6] dark:bg-gray-800": true,
          })}
        >
          <p className={"text-sm"}>
            Are you sure you want to delete this note?
          </p>
        </div>
        <div className={"w-full h-fit flex justify-end items-center gap-3"}>
          <button
            onClick={async () => {
              setIsLoading(true);
              // await deleteNote(focusedNote.id, dispatch);
              dispatch(closeDeleteForm());
              dispatch(closeUpdateForm());
              setIsLoading(false);
            }}
            className={classNames({
              "px-4 py-1 cursor-pointer rounded-md shadow-md": true,
              "bg-[#faaa87] text-[#fafafa] text-sm": true,
              "hover:scale-105 transition duration-150 ease-in-out": true,
            })}
          >
            {!isLoading ? "Delete" : <Loader />}
          </button>
          <button
            onClick={() => {
              setIsLoading(true);
              dispatch(closeDeleteForm());
              dispatch(closeUpdateForm());
              setIsLoading(false);
            }}
            className={classNames({
              "px-4 py-1 text-sm cursor-pointer": true,
              "text-[#1a1a1c] dark:text-white hover:bg-[#1a1a1c] hover:text-[#fafafa]":
                true,
              "border-2 border-gray-100 rounded-md shadow-md": true,
              "hover:scale-105 transition duration-300 ease-in-out": true,
            })}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
