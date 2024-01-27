"use client";

import React from "react";
import { toast } from "react-toastify";
import { Editor, LoadingSpinner } from "@/components";
import { useLoadData, useSetData, dataKey } from "@/custom-hooks/editorHooks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
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

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  let editor = React.useRef<any>(null);
  const { data, loading } = useLoadData();
  const { currentDoc, focusedDoc, docAPI } = useAppSelector(
    (state: any) => state.docs
  );
  const { isImgUploading, progress } = useAppSelector(
    (state: any) => state.image
  );
  const { editorImages } = useAppSelector((state: any) => state.editorImage);

  React.useEffect(() => {
    if (!authInstance) {
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
    if (body.descImg.includes("blob:")) {
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

    if (imageURL) {
      body = {
        ...body,
        descImg: imageURL,
      };
    }

    // Gettting Editor Content from local Storage
    let editorContent = localStorage.getItem(dataKey);

    // // Uploading Editor Image(s)...
    // editorImages.forEach(async (image: string, index: number) => {
    //   if (image.includes("https://res.cloudinary.com/")) return;
    //   dispatch(openImageUploadIndicator());
    //   const editor_img_response = await fetch(image);
    //   const editor_img_blob = await editor_img_response.blob();
    //   const editor_img__file = new File([editor_img_blob], "image.png", {
    //     type: "image/*",
    //   });
    //   const editor_img_form_data = new FormData();
    //   editor_img_form_data.append("upload_preset", "nextbit");
    //   editor_img_form_data.append(
    //     "cloud_name",
    //     process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
    //   );
    //   editor_img_form_data.append(
    //     "api_key",
    //     process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    //   );
    //   editor_img_form_data.append(
    //     "api_secret",
    //     process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    //   );
    //   editor_img_form_data.append("file", editor_img__file);
    //   const imageURL = await CloudImage(
    //     editor_img_form_data,
    //     dispatch,
    //     updateProgress
    //   );
    //   editorContent.replace(
    //     image,
    //     imageURL
    //       ? imageURL
    //       : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
    //   );
    //   dispatch(closeImageUploadIndicator());
    //   dispatch(clearProgress());
    // });

    // Updating the body and sending request...
    body = {
      ...body,
      access:
        focusedDoc.access === undefined
          ? [focusedDoc.emailID]
          : focusedDoc.access,
      content: editorContent,
      updatedAt: new Date().toISOString(),
    };
    console.log(body);
    // const res = await axios.post(
    //   docAPI === "create"
    //     ? "/api/document/create"
    //     : `/api/document/update/${currentDoc.id}`,
    //   body
    // );
    // if (res.status === 200) {
    //   toast.success("Document Saved", ToastConfig);
    //   setIsSubmitting(false);
    //   dispatch(clearCurrentDoc());
    //   router.push(`/dashboard/${authInstance._id}`);
    // } else {
    //   toast.error("Failed to Save Document, Please try again!", ToastConfig);
    //   setIsSubmitting(false);
    // }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <main
          className={`flex flex-col items-start gap-y-3 justify-start w-[96.5%] h-full overflow-hidden flex-[1]`}
        >
          <Editor
            editorRef={editor.current}
            docId={currentDoc.id}
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
    </>
  );
};

export default Page;
