import React, { useState } from "react";
import HomePage from "./_pages/homePage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  AddFormPopup,
  ColorPopup,
  Pagination,
  UpdateFormPopup,
} from "./_components";
import { Alert } from "./_components";
import classNames from "classnames";

export default function Home() {
  const { isFormOpen, isUpdateFormOpen } = useAppSelector(
    (state: any) => state.form
  );
  const { isColorFormOpen } = useAppSelector((state: any) => state.color);
  const { isDeleteFormOpen } = useAppSelector((state: any) => state.alert);
  const { isImgUploading, progress } = useAppSelector(
    (state: any) => state.image
  );
  const { noteData } = useAppSelector((state: any) => state.notes);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // getNotes(dispatch).then(() => {
    //   setIsLoading(false);
    // });
  }, []);

  React.useEffect(() => {
    setUploadProgress(progress);
  }, [progress]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen bg-[#fff7e9]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#faaa87]" />
        <h4 className="text-[#faaa87] font-bold text-2xl mb-[7.5rem]">
          Getting Your Notes...
        </h4>
        <div className="flex justify-center items-center gap-4 absolute bottom-20">
          <img src="/logo.png" width={42} height={42} alt="logo" />
          <h3
            className={classNames({
              "font-bold text-2xl text-[#ff9b73] dark:text-white": true,
              "flex justify-center items-center gap-4": true,
            })}
          >
            NoteWave
          </h3>
        </div>
      </div>
    );
  }

  const Illustration = () => {
    return (
      <div className="w-full h-full relative flex flex-col justify-center items-center gap-3">
        <img src="/no_note_1.png" className="w-auto h-[20rem]" />
        <div className="relative flex flex-col justify-center items-center gap-2 mobile:gap-1 mb-[2.5rem]">
          <h4 className="text-[#faaa87] font-bold text-2xl dark:text-blue-400 text-center mobile:text-[1.25rem]">
            Nothing here Yet!...
          </h4>
          <h4 className="text-[#faaa87] font-bold text-2xl dark:text-blue-400 text-center mobile:text-[1.25rem]">
            Be the first to clip your note here!...
          </h4>
        </div>
      </div>
    );
  };

  return (
    <>
      {isFormOpen && <AddFormPopup />}
      {isUpdateFormOpen && <UpdateFormPopup />}
      {isColorFormOpen && <ColorPopup />}
      {isDeleteFormOpen && <Alert />}
      {isImgUploading && (
        <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen bg-[#fff7e9] bg-opacity-80 absolute top-0 left-0 z-[100000]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#faaa87]" />
          <h4 className="text-[#faaa87] font-bold text-2xl mb-[7.5rem] mobile:w-[15rem] text-center">{`Uploading ${Math.trunc(
            uploadProgress
          )}%...`}</h4>
        </div>
      )}
      <HomePage>
        {noteData.length > 0 && <Pagination data={noteData} itemsPerPage={6} />}
        {noteData.length === 0 && <Illustration />}
      </HomePage>
    </>
  );
}
