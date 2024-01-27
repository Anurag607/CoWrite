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
import { updateEditorImages } from "@/redux/reducers/editorImgSlice";
import io from "socket.io-client";
import React from "react";
import { removeClient, setClient } from "@/redux/reducers/clientSlice";

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
    socket.emit("send-changes", outputString);
  };

  // Socket Event Handler...
  const handler = (delta: any) => {
    if (editorInstance.current === null) return;
    editorInstance.current.isReady
      .then(() => {
        let data = null;
        if (typeof delta === "string") data = JSON.parse(delta);
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
      documentId: docId,
      user: userData.email,
    });
    socket.on("update-clients", (newUser: any) => {
      if (newUser.currentDocument === docId) dispatch(setClient(newUser.name));
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
      socket = io(process.env.NEXT_PUBLIC_RENDER_SERVER);
      setSocket(socket);
    }

    window.addEventListener("beforeunload", () => {
      socket.disconnect();
      dispatch(removeClient(userData.email));
      setSocket(null);
    });

    return () => {
      socket.disconnect();
      dispatch(removeClient(userData.email));
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
          uploadByFile(file: File) {
            const blobUrl = URL.createObjectURL(file);
            dispatch(updateEditorImages(blobUrl));
            return Promise.resolve({
              success: 1,
              file: {
                url: blobUrl,
              },
            });
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
          className={`flex-[1] w-full h-fit relative mx-auto overflow-x-hidden overflow-y-scroll !text-primary !p-6 rounded-lg overflow-clip`}
          id={EditorData.EDITTOR_HOLDER_ID}
        />
      )}
      {children}
    </>
  );
};

export default EditorContainer;
