"use client";

import React, { useRef, useState } from "react";
import HomePage from "@/app/_pages/homePage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AddFormPopup,
  ColorPopup,
  Pagination,
  UpdateFormPopup,
} from "@/components";
import { Alert } from "@/components";
import classNames from "classnames";
import Image from "next/image";
import {
  clearBackupData,
  clearDocData,
  clearFocusedDoc,
  setBackupData,
  setDocData,
} from "@/redux/reducers/docSlice";
import axios from "axios";
import { resetDocColor } from "@/redux/reducers/colorSlice";
import { setShowBottomBar, setShowSidebar } from "@/redux/reducers/drawerSlice";
import { closeSidebar } from "@/redux/reducers/sidebarSlice";
import { clearSearchParams } from "@/redux/reducers/searchSlice";
import { closeMenu } from "@/redux/reducers/menuSlice";
import { closeFilter } from "@/redux/reducers/filterSlice";
import { closeForm, closeUpdateForm } from "@/redux/reducers/formSlice";
import { closeDeleteForm } from "@/redux/reducers/alertSlice";
import {
  clearProgress,
  closeImageUploadIndicator,
} from "@/redux/reducers/imgUploadSlice";
import { dataKey } from "@/custom-hooks/editorHooks";
import { destroyEditorInstance } from "@/redux/reducers/editorSlice";
import { useRouter } from "next-nprogress-bar";

export default function Page() {
  const router = useRouter();
  const { isFormOpen, isUpdateFormOpen } = useAppSelector(
    (state: any) => state.form
  );
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const { isColorFormOpen } = useAppSelector((state: any) => state.color);
  const { isDeleteFormOpen } = useAppSelector((state: any) => state.alert);
  const { isImgUploading, progress } = useAppSelector(
    (state: any) => state.image
  );
  const { docData } = useAppSelector((state: any) => state.docs);
  const [isLoading, setIsLoading] = useState(false);
  const docProgress = useRef(0);

  const dispatch = useAppDispatch();

  const cleanup = () => {
    localStorage.removeItem(dataKey);
    dispatch(closeMenu());
    dispatch(closeSidebar());
    // dispatch(clearSearchParams());
    // dispatch(clearDocData());
    // dispatch(clearBackupData());
    dispatch(clearFocusedDoc());
    dispatch(closeFilter());
    dispatch(closeForm());
    dispatch(closeUpdateForm());
    dispatch(resetDocColor());
    dispatch(closeDeleteForm());
    dispatch(closeImageUploadIndicator());
    dispatch(clearProgress());
    dispatch(setShowSidebar([false, ""]));
    dispatch(setShowBottomBar([false, ""]));
    dispatch(destroyEditorInstance());
    console.clear();
  };

  React.useEffect(() => {
    if (!authInstance) {
      router.push("/");
      return;
    }
    cleanup();

    const getData = async (user_email: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/document/read/${authInstance.email}`,
          {
            onUploadProgress: function (progressEvent: any) {
              let percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              docProgress.current = percentCompleted;
              console.log(percentCompleted);
            },
          }
        );

        if (typeof response.data.data !== "undefined") {
          dispatch(setDocData(response.data.data));
          dispatch(setBackupData(response.data.data));
        }
      } catch (error) {
        console.log({ status: error.response.status, msg: error.message });
      }
      setIsLoading(false);
    };

    if (docData === undefined) {
      dispatch(clearDocData());
      dispatch(clearBackupData());
    }

    const shouldReload = localStorage.getItem("shouldReload");

    if (typeof shouldReload === "string" && shouldReload === "true") {
      localStorage.removeItem("shouldReload");
      location.reload();
      return;
    } else {
      getData(authInstance.email);
      docProgress.current = 0;
    }
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 flex flex-col gap-4 items-center justify-center h-screen w-screen bg-zinc-800 bg-opacity-80 z-[100000] overflow-hidden">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main" />
        <h4 className="text-main font-bold text-2xl mobile:w-[15rem] text-center">{`Getting Your Docs...`}</h4>
      </div>
    );
  }

  const NotFound = () => {
    return (
      <div className="w-full h-full relative flex flex-col justify-center items-center gap-3 pr-[0rem] sm:pr-[4rem] md:pr-[6rem] mx-auto">
        <Image
          priority={true}
          height={400}
          width={400}
          alt={"NotFound"}
          src="/bw-nf.png"
          className={classNames({
            "brightness-[40%] dark:brightness-100 w-[17.5rem] xl:w-[20rem]":
              true,
          })}
        />
        <div className="relative flex flex-col justify-center items-center gap-2 mobile:gap-1 mb-[2.5rem]">
          <h4 className="rubik text-primary font-bold text-2xl text-center mobile:text-[1.25rem]">
            Nothing here Yet!...
          </h4>
        </div>
      </div>
    );
  };

  return (
    <>
      {docData === undefined ? (
        <NotFound />
      ) : (
        <HomePage>
          {docData.length > 0 && <Pagination data={docData} itemsPerPage={4} />}
          {docData.length === 0 && <NotFound />}
        </HomePage>
      )}
      {isFormOpen && <AddFormPopup />}
      {isUpdateFormOpen && <UpdateFormPopup />}
      {isColorFormOpen && <ColorPopup />}
      {isDeleteFormOpen && <Alert />}
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
}
