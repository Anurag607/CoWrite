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
import { useAppDispatch } from "@/redux/hooks";
import ImageTool from "@editorjs/image";
import { updateEditorImages } from "@/redux/reducers/editorImgSlice";
import io from "socket.io-client";
import React from "react";

const useEditor = (
  toolsList: { [toolName: string]: ToolConstructable | ToolSettings<any> },
  { data, docId, editorRef }: any,
  { setSocket, socket }: any
) => {
  let editor: any = null;
  const editorInstance = useRef<EditorJS | null>(null);
  // Function for Initializing Editor...
  const initEditor = () => {
    editor = new EditorJS({
      holder: EditorData.EDITTOR_HOLDER_ID,
      tools: toolsList,
      data: data || {},
      placeholder: "Start Writing Here...",
      defaultBlock: "paragraph",
      autofocus: false,
      onReady: () => {
        console.count("READY callback");
      },
      onChange: () => {
        console.count("CHANGE callback");
        contents();
      },
    });
  };

  // Funcion for saving Editor Contents...
  const contents = async () => {
    if (!editor) return;
    const output = await editor.save();
    const outputString = JSON.stringify(output);
    localStorage.setItem(dataKey, outputString);
    socket.emit("send-changes", outputString);
  };

  // Socket Event Handler...
  const handler = (delta: any) => {
    if (editorInstance.current === null) return;
    editorInstance.current.isReady
      .then(() => {
        editorInstance.current.render(delta);
      })
      .catch((e: any) => console.error("ERROR editor render/cleanup", e));
  };

  // Socket Connections...
  useEffect(() => {
    if (!socket || !editorInstance) return;

    socket.emit("updating-document", docId);
    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [socket, editorInstance, docId]);

  // Setting up Editor Instance...
  useEffect(() => {
    if (!editorInstance.current) return;
    if (editorRef) {
      editorRef(editorInstance.current);
      socket.emit("updating-document", docId);
    }
  }, [editorInstance, editorRef]);

  // Initializing Socket and Cleanup...
  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:8000");
      socket.on("connect", () => {
        console.log(socket.id);
      });
      socket.on("disconnect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });
      setSocket(socket);
    }

    return () => {
      socket.disconnect();
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
          editorInstance.current = null;
          editorRef(null);
        })
        .catch((e: any) => console.error("ERROR editor cleanup", e));
    };
  }, [toolsList]);

  return { editor: editorInstance.current };
};

const EditorContainer = ({ editorRef, children, docId, data }: any) => {
  const dispatch = useAppDispatch();
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
    { setSocket, socket }
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
