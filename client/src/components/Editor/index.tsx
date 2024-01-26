import { useEffect, useRef } from "react";
import EditorJS, { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import EDITOR_TOOLS from "@/utils/Editor/editorTools";
import EditorData from "@/utils/Editor/data.json";
import { dataKey } from "@/custom-hooks/editorHooks";
import { useAppDispatch } from "@/redux/hooks";
import ImageTool from "@editorjs/image";
import { updateEditorImages } from "@/redux/reducers/editorImgSlice";

/**
 *
 * @param {EditorJS.Tool[]} toolsList
 * @param {*} param1
 * @param {EditorJS.EditorConfig} options
 */

const useEditor = (
  toolsList: { [toolName: string]: ToolConstructable | ToolSettings<any> },
  { data, editorRef }: any,
  dispatch: any
) => {
  const editorInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EditorData.EDITTOR_HOLDER_ID,
      tools: toolsList,
      data: data || {},
      placeholder: "Start Writing Here...",
      defaultBlock: "paragraph",
      autofocus: false,
      onReady: () => {
        // editorInstance.current = editor;
        console.count("READY callback");
      },
      onChange: () => {
        console.count("CHANGE callback");
        contents();
      },
    });

    const contents = async () => {
      const output = await editor.save();
      const outputString = JSON.stringify(output);
      localStorage.setItem(dataKey, outputString);
    };
  };

  useEffect(() => {
    if (!editorInstance.current) initEditor();

    return () => {
      if (!editorInstance.current) return;
      editorInstance.current.isReady
        .then(() => {
          editorInstance.current.destroy();
          editorInstance.current = null;
        })
        .catch((e: any) => console.error("ERROR editor cleanup", e));
    };
  }, [toolsList]);

  useEffect(() => {
    if (!editorInstance.current) return;
    if (editorRef.current) {
      editorRef.current = editorInstance.current;
    }
  }, [editorInstance, editorRef]);

  return { editor: editorInstance.current };
};

const EditorContainer = ({ editorRef, children, data }: any) => {
  const dispatch = useAppDispatch();

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

  useEditor(TOOLS_LIST as any, { data, editorRef }, dispatch);

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
