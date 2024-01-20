import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Cookie from "js-cookie";
import { createDoc } from "@/queries/documentQueries";
import { toast } from "react-toastify";
import { LoaderSkeleton } from "@/app/_components";

const CustomEditor = dynamic(() => import("@/app/_components/TextEditor"), {
  ssr: false,
});

const DocumentEditor = () => {
  const [content, Setcontent] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);
  const auth = Cookie.get("userDetails");

  const router = useRouter();

  return (
    <>
      {isLoading ? (
        <LoaderSkeleton />
      ) : (
        <main className={``}>
          <div className={``}>
            <div className={``}>
              {/* <CustomEditor setContent={Setcontent} content={content} /> */}
            </div>
            <button
              className={``}
              onClick={() => {
                if (auth?.hasOwnProperty("username")) {
                  createDoc(null);
                } else {
                  toast.error("Failed to Save Document", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }
              }}
            >
              Save
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default DocumentEditor;
