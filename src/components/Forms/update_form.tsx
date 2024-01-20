import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeUpdateForm } from "@/redux/reducers/formSlice";
import classNames from "classnames";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { openColorForm, setNoteColor } from "@/redux/reducers/colorSlice";
import { openDeleteForm } from "@/redux/reducers/alertSlice";
import { LoadingSpinner } from "..";

const UpdateFormPopup = () => {
  const dispatch = useAppDispatch();
  const { noteColor } = useAppSelector((state: any) => state.color);
  const { focusedNote } = useAppSelector((state: any) => state.notes);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    email: "",
    note: "",
    pinned: false,
    image: null,
    color: noteColor,
  });

  React.useEffect(() => {
    dispatch(setNoteColor(focusedNote.color));
    setFormData({ ...focusedNote });
  }, [focusedNote]);

  React.useEffect(() => {
    if (formData.id.length > 0) {
      setFormData({ ...formData, color: noteColor });
    } else {
      setFormData({ ...focusedNote });
    }
  }, [noteColor]);

  const handleCloseForm = () => {
    dispatch(closeUpdateForm());
  };

  const ImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (file == null) {
      // await updateNote(formData.id, formData, dispatch).then(() => {
      //   getNotes(dispatch);
      //   setIsLoading(false);
      //   handleCloseForm();
      // });
    } else {
      // await uploadImage(formData, file, "update", formData.id, dispatch).then(
      //   () => {
      //     setIsLoading(false);
      //     handleCloseForm();
      //   }
      // );
    }
  };

  const inputFields = [
    {
      name: "Title",
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, title: e.target.value }),
      value: formData.title,
    },
    {
      name: "Sub-Title",
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, subtitle: e.target.value }),
      value: formData.subtitle,
    },
    {
      name: "Email ID",
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, email: e.target.value }),
      value: formData.email,
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
      <div className="relative bg-white mobile:w-[95vw] rounded-lg p-4 shadow-lg w-fit dark:bg-gray-900">
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
        {/* Popup Header - Label, delete, color, pin */}
        <div className="border-b rounded-t dark:border-gray-600 flex justify-between items-center">
          <div className="px-2 py-4 flex gap-2">
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
              Edit Note
            </h3>
          </div>
          <div className={"flex items-center justify-center w-fit h-fit gap-3"}>
            <button
              onClick={() => dispatch(openDeleteForm())}
              className={
                "p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-red-300 transition duration-150 ease-in-out"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              onClick={() => dispatch(openColorForm())}
              className={classNames({
                "rounded-lg p-4 cursor-pointer": true,
              })}
              style={{ backgroundColor: formData.color }}
            />
            <div
              onClick={() =>
                setFormData({ ...formData, pinned: !formData.pinned })
              }
              className={classNames({
                "px-2 flex gap-2 justify-center items-center mr-4 sm:mr-6 rounded-lg cursor-pointer":
                  true,
                "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                  !formData.pinned,
                "bg-transparent border dark:text-[#e8e8e8]": formData.pinned,
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
          className="relative flex flex-col items-center justify-center"
        >
          <div className="relative flex sm:flex-row h-[60vh] overflow-scroll sm:h-fit flex-col items-start justify-start px-2 sm:px-0 sm:justify-center w-full sm:gap-4">
            {/* Section-1: title, subtitle, emailid */}
            <div className={"relative w-full"}>
              {inputFields.map((el: (typeof inputFields)[0], i: number) => {
                return (
                  <div className="relative mb-4 mt-2" key={i}>
                    <input
                      type="text"
                      id={el.name}
                      className={classNames({
                        "mobile:w-full anti-mobile:w-[19.5rem]": true,
                        "block px-2.5 pb-2.5 pt-4 w-[15rem]": true,
                        "text-sm text-gray-900 bg-gray-100 dark:bg-gray-700":
                          true,
                        "rounded-lg border-1 border-gray-900": true,
                        "appearance-none dark:text-white": true,
                        "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                          true,
                      })}
                      onChange={el.function}
                      value={el.value}
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
            </div>
            {/* Section-2: Note, Image */}
            <div>
              <div className="relative mb-4 mt-2 flex flex-col items-start justify-start">
                <textarea
                  id="Note"
                  rows={5}
                  className={classNames({
                    "mobile:w-full anti-mobile:w-[19.5rem] overflow-hidden":
                      true,
                    "block px-2 py-2 w-[15rem] resize-none": true,
                    "text-sm text-gray-900 bg-gray-100 dark:bg-gray-700": true,
                    "rounded-lg border-1 border-gray-900": true,
                    "appearance-none dark:text-white": true,
                    "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                      true,
                  })}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  value={formData.note}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="Note"
                  className={classNames({
                    "absolute left-1": true,
                    "top-2": formData.note.length > 0,
                    "top-6": formData.note.length == 0,
                    "z-10 origin-[0] px-2": true,
                    "peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500":
                      true,
                    "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-4":
                      true,
                    "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4":
                      true,
                    "bg-transparent": true,
                    "text-sm text-gray-500 dark:text-gray-400": true,
                    "duration-300 transform -translate-y-4 scale-75": true,
                  })}
                >
                  Note
                </label>
              </div>
              <div>
                <input
                  type="file"
                  id="note_image"
                  accept="image/*"
                  onChange={ImageChangeHandler}
                  className={classNames({
                    "mobile:w-full anti-mobile:w-[19.5rem]": true,
                    "block w-[15rem] cursor-pointer focus:outline-none": true,
                    "text-sm text-gray-900": true,
                    "bg-gray-50 dark:text-gray-400": true,
                    "border border-gray-300 rounded-sm": true,
                    "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400":
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
              className="bg-[#ff9b73] text-white px-4 py-2 rounded-md hover:bg-[#ffc972] focus:outline-none ripple dark:bg-blue-400 hover:dark:bg-blue-600"
            >
              {!isLoading ? "Update" : <LoadingSpinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFormPopup;
