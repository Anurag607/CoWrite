"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import classNames from "classnames";
import { LoadingSpinner } from "@/components";
import { toast } from "react-toastify";
import { ToastConfig } from "@/utils/config";
import { switchEditor } from "@/redux/reducers/toggleEditor";
import { useRouter } from "next-nprogress-bar";
import { uuidv7 } from "uuidv7";
import { clearClients } from "@/redux/reducers/clientSlice";
import { clearCodeUserData, setCodeUserData } from "@/redux/reducers/codeSlice";

const showError = (msg: string) => toast.error(msg, ToastConfig);

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    roomId: "",
    email: "",
    username: "",
  });

  React.useEffect(() => {
    dispatch(switchEditor("code"));
    dispatch(clearClients());
    dispatch(clearCodeUserData());
    if (authInstance) {
      setFormData({
        ...formData,
        email: authInstance.email,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setCodeUserData(formData));
    router.push(`/codeForge/editor/${formData.roomId}`);
    setIsLoading(false);
  };

  const inputFields = [
    {
      name: "RoomId",
      placeholder: "RoomId",
      type: "text",
      isRequired: true,
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, roomId: e.target.value }),
      value: formData.roomId,
    },
    {
      name: "Username",
      placeholder: "Username",
      type: "text",
      isRequired: true,
      function: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, username: e.target.value }),
      value: formData.username,
    },
  ];

  return (
    <div
      className={classNames({
        "w-full h-full flex flex-col items-center justify-center flex-wrap mobile:gap-0 gap-8":
          true,
      })}
    >
      <div
        className={classNames({
          "text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center bound tracking-wide":
            true,
          "mobile-sm:w-[95vw] w-[25rem] h-fit break-before-avoid mr-24 mobile:mr-0":
            true,
        })}
      >
        {"Welcome to CodeForge."}
      </div>
      {/* Form... */}
      <div className="relative bg-white mobile:w-[95vw] rounded-lg px-4 py-8 w-[19rem] dark:bg-neutral-800 mr-24 mobile:mr-0 mobile:mb-0 mb-12">
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
            </div>
          </div>
          {/* Submit... */}
          <div className="mt-4 w-full flex flex-wrapj items-center justify-center gap-4">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                setFormData({ ...formData, roomId: uuidv7() });
              }}
              className={classNames({
                "cursor-default pointer-events-none": isLoading,
                "px-4 py-2 rounded-md focus:outline-none border": true,
                "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                  true,
                "hover:!bg-transparent hover:text-primary hover:border-primary hover:dark:text-[#e8e8e8]":
                  true,
              })}
            >
              {"Generate RoomId"}
            </button>
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
              {!isLoading ? "Join" : <LoadingSpinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
