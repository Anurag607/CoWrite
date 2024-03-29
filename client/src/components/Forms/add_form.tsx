import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeForm } from "@/redux/reducers/formSlice";
import classNames from "classnames";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { openColorForm } from "@/redux/reducers/colorSlice";
import { LoadingSpinner } from "..";
import { useRouter } from "next-nprogress-bar";
import { setCurrentDoc, alterDocAPI } from "@/redux/reducers/docSlice";

const AddFormPopup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { docColor } = useAppSelector((state: any) => state.color);
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: +new Date(),
    title: "",
    emailID: authInstance.email,
    color: docColor,
    pinned: false,
    descImg: null,
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  React.useEffect(() => {
    setFormData({ ...formData, color: docColor });
  }, [docColor]);

  const handleCloseForm = () => {
    dispatch(closeForm());
  };

  const ImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(alterDocAPI("create"));
    setIsLoading(true);
    formData.color = docColor;
    if (file == null) {
      dispatch(setCurrentDoc(formData));
      setIsLoading(false);
      router.push(
        `/document/${authInstance._id}?docId=${+new Date(formData.updatedAt)}`
      );
    } else {
      const blobURL = URL.createObjectURL(file);
      formData.descImg = blobURL;
      dispatch(setCurrentDoc(formData));
      setIsLoading(false);
      handleCloseForm();
      router.push(
        `/document/${authInstance._id}?docId=${+new Date(formData.updatedAt)}`
      );
    }
  };

  const inputFields = [
    {
      name: "Title",
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, title: e.target.value }),
    },
  ];

  const Pin = () => {
    if (formData.pinned == false) {
      return <PushpinOutlined className={"text-xl pb-1"} />;
    } else {
      return <PushpinFilled className={"text-xl pb-1"} />;
    }
  };

  return (
    <div
      className={classNames({
        "fixed top-0 left-0 w-full h-full z-[100000]": true,
        "flex items-center justify-center": true,
        "bg-gray-800 bg-opacity-50": true,
      })}
    >
      <div className="relative bg-white mobile:w-[95vw] rounded-lg px-4 py-8 shadow-lg w-[19rem] dark:bg-neutral-800">
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
        <div className="border-b rounded-t py-3 dark:border-gray-600 flex justify-between items-center">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 dark:invert"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
              Add Doc
            </h3>
          </div>
          <div className={"flex items-center justify-center w-fit h-fit gap-3"}>
            <div
              onClick={() => dispatch(openColorForm())}
              className={classNames({
                "rounded-lg p-4 cursor-pointer": true,
              })}
              style={{ backgroundColor: docColor }}
            />
            <div
              onClick={() =>
                setFormData({ ...formData, pinned: !formData.pinned })
              }
              className={classNames({
                "px-2 flex gap-2 justify-center items-center  rounded-lg cursor-pointer border":
                  true,
                "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                  !formData.pinned,
                "bg-transparent dark:text-[#e8e8e8] border-primary":
                  formData.pinned,
                ripple: true,
              })}
            >
              <Pin />
              {formData.pinned ? "Pinned" : "Pin"}
            </div>
          </div>
        </div>
        {/* Form... */}
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col items-center justify-center w-full"
        >
          <div className="relative flex sm:flex-row h-fit overflow-scroll sm:overflow-hidden sm:h-fit flex-col items-start justify-start sm:justify-center w-full sm:gap-4">
            <div className={"relative w-full"}>
              {inputFields.map((el: (typeof inputFields)[0], i: number) => {
                return (
                  <div className="relative mb-4 mt-2 w-full" key={i}>
                    <input
                      type="text"
                      id={el.name}
                      className={classNames({
                        "block px-2.5 pb-2.5 pt-4 w-full": true,
                        "text-sm text-gray-900 bg-gray-100 dark:bg-neutral-700":
                          true,
                        "rounded-lg border-1 border-gray-900": true,
                        "appearance-none dark:text-white": true,
                        "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                          true,
                      })}
                      onChange={el.function}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor={el.name}
                      className={classNames({
                        "absolute top-2 left-1": true,
                        "z-10 origin-[0] px-2": true,
                        "peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500":
                          true,
                        "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2":
                          true,
                        "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4":
                          true,
                        "bg-transparent": true,
                        "text-sm text-gray-500 dark:text-gray-400": true,
                        "duration-300 transform -translate-y-4 scale-75": true,
                      })}
                    >
                      {el.name}
                    </label>
                  </div>
                );
              })}
              <div>
                <input
                  type="file"
                  id="doc_image"
                  accept="image/*"
                  onChange={ImageChangeHandler}
                  className={classNames({
                    "block w-full cursor-pointer focus:outline-none": true,
                    "text-sm text-gray-900": true,
                    "bg-gray-50 dark:text-gray-400": true,
                    "border border-gray-300 rounded-sm": true,
                    "dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400":
                      true,
                  })}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>
          </div>
          {/* Submit... */}
          <div className="mt-4 w-full flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={classNames({
                "cursor-default pointer-events-none": isLoading,
                "px-4 py-2 rounded-md focus:outline-none border": true,
                "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                  true,
                "hover:!bg-transparent hover:text-primary hover:border-primary hover:dark:text-[#e8e8e8]":
                  true,
              })}
            >
              {!isLoading ? "Add Content" : <LoadingSpinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFormPopup;
