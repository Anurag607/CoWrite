import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeUpdateForm } from "@/redux/reducers/formSlice";
import classNames from "classnames";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { openColorForm, setDocColor } from "@/redux/reducers/colorSlice";
import { openDeleteForm } from "@/redux/reducers/alertSlice";
import { LoadingSpinner } from "..";
import {
  alterDocAPI,
  clearCurrentDoc,
  setCurrentDoc,
} from "@/redux/reducers/docSlice";
import { dataKey } from "@/custom-hooks/editorHooks";
import {
  clearProgress,
  closeImageUploadIndicator,
  openImageUploadIndicator,
  updateProgress,
} from "@/redux/reducers/imgUploadSlice";
import { CloudImage } from "@/cloudinary/CloudImage";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastConfig } from "@/utils/config";
import { format } from "path/posix";

const showError = (msg: string) => toast.error(msg, ToastConfig);

const UpdateFormPopup = () => {
  const dispatch = useAppDispatch();
  const { docColor } = useAppSelector((state: any) => state.color);
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const { currentDoc, focusedDoc } = useAppSelector((state: any) => state.docs);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: focusedDoc._id,
    title: focusedDoc.title,
    emailID: focusedDoc.owner,
    access: "",
    revokeAccess: "",
    color: focusedDoc.color,
    pinned: focusedDoc.pinned,
    descImg: focusedDoc.descImg,
    content: focusedDoc.content,
    createdAt: focusedDoc.createdAt,
    updatedAt: new Date().toISOString(),
  });

  React.useEffect(() => {
    // console.log(focusedDoc.owner, authInstance.email);
    localStorage.setItem(dataKey, JSON.stringify(focusedDoc.content));
    dispatch(setDocColor(focusedDoc.color));
  }, [focusedDoc]);

  React.useEffect(() => {
    setFormData({ ...formData, color: docColor });
  }, [docColor]);

  const handleCloseForm = () => {
    dispatch(closeUpdateForm());
  };

  const ImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(alterDocAPI("update"));
    setIsLoading(true);
    let imageURL = formData.descImg;
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      dispatch(openImageUploadIndicator());
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      const new_file = new File([blob], "image.png", { type: "image/*" });
      const form_data = new FormData();
      form_data.append("upload_preset", "nextbit");
      form_data.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
      );
      form_data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      form_data.append(
        "api_secret",
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
      );
      form_data.append("file", new_file);
      imageURL = await CloudImage(form_data, dispatch, updateProgress);
      dispatch(closeImageUploadIndicator());
      dispatch(clearProgress());
      setFormData({ ...formData, descImg: imageURL });
    }

    dispatch(setCurrentDoc(formData));

    const res = await axios.post(`/api/document/update/${formData.id}`, {
      ...formData,
      access:
        formData.access.length > 0
          ? [formData.access, ...focusedDoc.access].filter(
              (val: string) => val !== formData.revokeAccess
            )
          : focusedDoc.access.filter(
              (val: string) => val !== formData.revokeAccess
            ),
      descImg: imageURL,
    });
    if (res.status === 200) {
      toast.success("Document Saved", ToastConfig);
      dispatch(clearCurrentDoc());
      setIsLoading(false);
      handleCloseForm();
      location.reload();
    } else {
      showError("Failed to Save Document, Please try again!");
      setIsLoading(false);
      handleCloseForm();
    }
  };

  const inputFields = [
    {
      name: "Title",
      placeholder: "Title",
      type: "text",
      isRequired: true,
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, title: e.target.value }),
      value: formData.title,
    },
    focusedDoc.owner === authInstance.email
      ? {
          name: "Give Access",
          placeholder: "Update Access",
          type: "email",
          isRequired: false,
          function: (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
              ...formData,
              access: e.target.value,
            });
          },
          value: formData.access,
        }
      : null,
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
        {/* Popup Header - Label, delete, color, pin */}
        <div className="border-b rounded-t py-3 dark:border-gray-600 flex justify-between items-center w-full relative">
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
              Edit Doc
            </h3>
          </div>
          <div className={"flex items-center justify-center w-fit h-fit gap-3"}>
            {focusedDoc.owner === authInstance.email ? (
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
            ) : (
              <></>
            )}
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
                "px-2 flex gap-2 justify-center items-center rounded-lg cursor-pointer":
                  true,
                "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                  !formData.pinned,
                "bg-transparent border dark:text-[#e8e8e8]": formData.pinned,
                ripple: true,
              })}
            >
              <Pin />
            </div>
          </div>
        </div>
        {/* Form... */}
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col items-center justify-center"
        >
          <div className="relative flex sm:flex-row h-fit overflow-scroll sm:overflow-hidden sm:h-fit flex-col items-start justify-start sm:justify-center w-full sm:gap-4">
            <div className={"relative w-full"}>
              {inputFields.map((el: (typeof inputFields)[0], i: number) => {
                if (!el) return <></>;
                return (
                  <div className="relative mb-4 mt-2 w-full" key={i}>
                    <input
                      type={el.type}
                      id={el.name}
                      className={classNames({
                        "block px-2.5 pb-2.5 pt-4 w-full": true,
                        "text-sm text-gray-900 bg-gray-100 dark:bg-neutral-700":
                          true,
                        "rounded-lg border-1 border-gray-900": true,
                        "appearance-none dark:text-white cursor-text": true,
                        "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                          true,
                      })}
                      onChange={el.function}
                      value={el.value}
                      placeholder=" "
                      required={el.isRequired}
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
              {/* Access List */}
              {focusedDoc.owner === authInstance.email ? (
                <div className="relative mb-4 mt-2 w-full">
                  <select
                    id={"access_list"}
                    className={classNames({
                      "block px-2.5 pb-2.5 pt-4 w-full": true,
                      "text-sm text-gray-900 bg-gray-100 dark:bg-neutral-700":
                        true,
                      "rounded-lg border-1 border-gray-900": true,
                      "appearance-none dark:text-white cursor-text": true,
                      "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                        true,
                    })}
                    onChange={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        revokeAccess: e.target.value,
                      });
                    }}
                    value={formData.revokeAccess}
                  >
                    {["", ...focusedDoc.access].map((el: string, i: number) => {
                      if (el === authInstance.email) return <></>;
                      return (
                        <option
                          key={i}
                          value={el}
                          className={classNames({
                            "text-sm text-primary bg-main kanit": true,
                            "border-none outline-none": true,
                          })}
                        >
                          {el}
                        </option>
                      );
                    })}
                  </select>
                  <label
                    htmlFor={"access_list"}
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
                    {"Access List (Revoke Access)"}
                  </label>
                </div>
              ) : (
                <></>
              )}
              {/* Desc Image */}
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
              {!isLoading ? "Update" : <LoadingSpinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFormPopup;
