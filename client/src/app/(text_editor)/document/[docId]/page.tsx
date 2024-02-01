"use client";

import React from "react";
import { toast } from "react-toastify";
import { AccessDropdown, Editor, LoadingSpinner } from "@/components";
import { useLoadData, useSetData, dataKey } from "@/custom-hooks/editorHooks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCurrentDoc } from "@/redux/reducers/docSlice";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { CloudImage } from "@/cloudinary/CloudImage";
import {
  openImageUploadIndicator,
  closeImageUploadIndicator,
  updateProgress,
  clearProgress,
} from "@/redux/reducers/imgUploadSlice";
import { ToastConfig } from "@/utils/config";
import { CaretLeftOutlined, CaretUpOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { setShowBottomBar, setShowSidebar } from "@/redux/reducers/drawerSlice";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  let editor = React.useRef<any>(null);
  const { data, loading } = useLoadData();
  const { clients } = useAppSelector((state: any) => state.client);
  const { currentDoc, focusedDoc, docAPI } = useAppSelector(
    (state: any) => state.docs
  );
  const { isImgUploading, progress } = useAppSelector(
    (state: any) => state.image
  );

  React.useEffect(() => {
    if (!authInstance) {
      router.push(`/`);
      return;
    }
    searchParams.forEach((key, value) => {
      if (value === "docId") {
        localStorage.setItem("shouldReload", "true");
      }
    });
    setIsLoading(loading);
  }, []);

  useSetData(editor.current, data);

  const createDoc = async () => {
    setIsSubmitting(true);
    let body = currentDoc;
    let imageURL = null;

    // Uploading Description Image...
    if (body.descImg && body.descImg.includes("blob:")) {
      dispatch(openImageUploadIndicator());
      const response = await fetch(body.descImg);
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
    }

    body = {
      ...body,
      descImg: imageURL && imageURL.includes("blob:") ? null : imageURL,
    };

    // Updating the body and sending request...
    body = {
      ...body,
      user: authInstance.email,
      access:
        docAPI === "create"
          ? [authInstance.email]
          : focusedDoc.access === undefined
          ? [focusedDoc.emailID]
          : focusedDoc.access,
      content: localStorage.getItem(dataKey),
      updatedAt: new Date().toISOString(),
    };
    const res = await fetch(
      docAPI === "create"
        ? "/api/document/create"
        : `/api/document/update/${currentDoc.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    if (data.status === 202) {
      toast.success("Document Saved", ToastConfig);
      setIsSubmitting(false);
      dispatch(clearCurrentDoc());
      router.push(`/dashboard/${authInstance._id}`);
    } else if (data.status === 404 || data.status === 401) {
      toast.error(data.message, ToastConfig);
      setIsSubmitting(false);
      router.push(`/dashboard/${authInstance._id}`);
    } else {
      toast.error("Failed to Save Document, Please try again!", ToastConfig);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <main
          className={`flex flex-col items-start gap-y-3 justify-start w-[96.5%] h-fit overflow-x-hidden overflow-y-auto flex-[1]`}
        >
          {focusedDoc &&
            focusedDoc.owner === authInstance.email &&
            docAPI !== "create" && (
              <div
                className={
                  "w-full h-fit flex items-center justify-end mobile:pr-0 pr-20 gap-x-2"
                }
              >
                <AccessDropdown />
              </div>
            )}
          <div
            className={
              "w-full h-fit mobile:flex hidden items-center justify-end gap-x-2 pr-3"
            }
          >
            {clients.map((el: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`bg-primary rounded-full py-1 px-3 border-2 border-sidebar shadow-lg group relative`}
                >
                  <h4 className={`text-main text-lg font-bold`}>
                    {el[0].toUpperCase()}
                  </h4>
                  <span
                    className={
                      "absolute break-before-avoid bottom-[-60%] right-0 opacity-75 w-fit h-fit px-2 py-1 text-xs rounded-md bg-primary text-main scale-0 group-hover:scale-100"
                    }
                  >
                    {el}
                  </span>
                </div>
              );
            })}
          </div>
          {(docAPI === "create" ? currentDoc : focusedDoc).descImg && (
            <div className="w-full mobile:h-[10rem] h-[15rem] flex items-center justify-center relative">
              <img
                loading="lazy"
                src={(docAPI === "create" ? currentDoc : focusedDoc).descImg}
                alt="desc-img"
                className="object-cover w-[90%] h-full rounded-xl shadow-md"
              />
            </div>
          )}
          <Editor
            editorRef={editor.current}
            docId={docAPI === "create" ? currentDoc.id : focusedDoc._id}
            data={data}
          />
          <button
            disabled={isLoading || isSubmitting}
            className={`${
              (isLoading || isSubmitting) &&
              "cursor-default pointer-events-none"
            } bg-primary text-main py-2 px-8 rounded-full mx-auto`}
            onClick={(e) => {
              e.preventDefault();
              createDoc();
            }}
          >
            {!isSubmitting ? "Save Document" : <LoadingSpinner />}
          </button>
        </main>
      )}
      {isImgUploading && (
        <div className="fixed top-0 left-0 flex flex-col gap-4 items-center justify-center h-screen w-screen bg-zinc-800 bg-opacity-80 z-[100000] overflow-hidden">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main" />
          <h4 className="text-main font-bold text-2xl mobile:w-[15rem] text-center">{`Uploading Image ${Math.trunc(
            progress
          )}%...`}</h4>
        </div>
      )}
      <div
        onClick={() => {
          dispatch(setShowBottomBar([true, ""]));
          dispatch(setShowSidebar([true, ""]));
        }}
        className={classNames({
          "w-[42px] h-[42px] mobile:hidden flex items-center justify-center":
            true,
          [`bg-primary text-main text-3xl rounded-l-lg`]: true,
          "z-[100001] transition-all": true,
          "fixed right-0 top-[20%]": true,
        })}
      >
        <CaretLeftOutlined />
      </div>
      <div
        onClick={() => {
          dispatch(setShowBottomBar([true, ""]));
          dispatch(setShowSidebar([true, ""]));
        }}
        className={classNames({
          "w-[36px] h-[36px] hidden mobile:flex items-center justify-center":
            true,
          [`bg-primary text-main text-xl rounded-t-lg`]: true,
          "z-[100001] transition-all": true,
          "fixed bottom-0 right-[30%]": true,
        })}
      >
        <CaretUpOutlined />
      </div>
    </>
  );
};

export default Page;
