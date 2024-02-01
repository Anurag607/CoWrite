/**
 *
 * @param {EditorJS.Tool[]} toolsList
 * @param {*} param1
 * @param {EditorJS.EditorConfig} options
 */

import { useEffect, useRef } from "react";
import EditorJS, { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import EDITOR_TOOLS from "@/utils/Editor/editorTools";
import EditorData from "@/utils/Editor/data.json";
import { dataKey } from "@/custom-hooks/editorHooks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ImageTool from "@editorjs/image";
import io from "socket.io-client";
import React from "react";
import { removeClient, setClient } from "@/redux/reducers/clientSlice";
import { CloudImage } from "@/cloudinary/CloudImage";
import { updateProgress } from "@/redux/reducers/imgUploadSlice";

const useEditor = (
  toolsList: { [toolName: string]: ToolConstructable | ToolSettings<any> },
  { data, docId, editorRef }: any,
  { setSocket, socket }: any,
  userData: any,
  dispatch: any
) => {
  let editorInstance = useRef<EditorJS | null>(null);

  // Function for Initializing Editor...
  const initEditor = () => {
    const editor = new EditorJS({
      holder: EditorData.EDITTOR_HOLDER_ID,
      tools: toolsList,
      placeholder: "Start Writing here...",
      data: data || {},
      defaultBlock: "paragraph",
      autofocus: false,
      onReady: () => {
        console.count("READY callback");
        editorInstance.current = editor;
      },
      onChange: () => {
        console.count("CHANGE callback");
        contents();
      },
    });
  };

  // Funcion for saving Editor Contents...
  const contents = async () => {
    if (!editorInstance.current) return;
    const output = await editorInstance.current.save();
    const outputString = JSON.stringify(output);
    localStorage.setItem(dataKey, outputString);
    if (socket) socket.emit("send-changes", outputString);
  };

  // Handler for changing editor content...
  const handler = (delta: any) => {
    if (editorInstance.current === null || delta.room !== docId) return;
    editorInstance.current.isReady
      .then(() => {
        let data = null;
        if (typeof delta.data === "string") data = JSON.parse(delta.data);
        if (!data.hasOwnProperty("blocks")) data = JSON.parse(data);
        editorInstance.current.render(data);
        localStorage.setItem(dataKey, delta);
      })
      .catch((e: any) => console.error("ERROR editor render/cleanup", e));
  };

  // Socket Connections...
  useEffect(() => {
    if (!socket || !editorInstance) return;

    socket.emit("updating-document", {
      id: socket.id,
      documentId: docId,
      user: userData.email,
    });
    socket.on("update-clients", (newUser: any) => {
      if (newUser.currentDocument === docId) dispatch(setClient(newUser.name));
    });
    socket.on("disconnect", (newUser: any) => {
      if (newUser.currentDocument === docId)
        dispatch(removeClient(newUser.name));
      socket.emit("disconnecting-document", {
        id: socket.id,
        currentDocument: docId,
        name: userData.email,
      });
    });
    socket.on("remove-clients", (newUser: any) => {
      if (newUser.currentDocument === docId)
        dispatch(removeClient(newUser.name));
    });
    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [socket, editorInstance, docId]);

  // Setting up Editor Instance...
  useEffect(() => {
    if (!editorInstance.current) return;
    if (editorRef && !editorInstance.current.isReady) {
      editorRef.current = editorInstance.current;
    }
  }, [editorInstance, editorRef]);

  // Initializing Socket and Cleanup...
  useEffect(() => {
    if (!socket) {
      let socket = io(process.env.NEXT_PUBLIC_RENDER_SERVER);
      setSocket(socket);
    }

    return () => {
      if (socket) socket.disconnect();
      setSocket(null);
    };
  }, []);

  // Initializing Editor & Cleanup...
  useEffect(() => {
    if (!editorInstance.current) initEditor();

    return () => {
      if (!editorInstance.current) return;
      editorInstance.current.isReady
        .then(() => {
          editorInstance.current.destroy();
          editorInstance = null;
          editorRef = null;
        })
        .catch((e: any) => console.error("ERROR editor cleanup", e));
    };
  }, []);

  return { editor: editorInstance.current };
};

const EditorContainer = ({ editorRef, children, docId, data }: any) => {
  const dispatch = useAppDispatch();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [socket, setSocket] = React.useState<any>(null);

  const TOOLS_LIST = {
    ...EDITOR_TOOLS,
    image: {
      class: ImageTool,
      config: {
        uploader: {
          async uploadByFile(file: File) {
            const formData = new FormData();
            formData.append("upload_preset", "nextbit");
            formData.append(
              "cloud_name",
              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
            );
            formData.append(
              "api_key",
              process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
            );
            formData.append(
              "api_secret",
              process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
            );
            formData.append("file", file);

            return CloudImage(formData, dispatch, updateProgress).then(
              (imageURL) => {
                return {
                  success: 1,
                  file: {
                    url: imageURL
                      ? imageURL
                      : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
                  },
                };
              }
            );
          },
        },
      },
    },
  };

  useEditor(
    TOOLS_LIST as any,
    { data, docId, editorRef },
    { setSocket, socket },
    authInstance,
    dispatch
  );

  return (
    <>
      {!children && (
        <div
          className={`flex-[1] w-full h-fit relative mx-auto !text-primary !p-6 rounded-lg`}
          id={EditorData.EDITTOR_HOLDER_ID}
        />
      )}
      {children}
    </>
  );
};

export default EditorContainer;
