import React from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import RawTool from "@editorjs/raw";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Delimeter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import Warning from "@editorjs/warning";
import { StyleInlineTool } from "editorjs-style";
import Tooltip from "editorjs-tooltip";
import { CloudImage } from "@/cloudinary/CloudImage";
import _ from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDocContent } from "@/redux/reducers/docContentSlice";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "paragraph",
        data: {
          placeholder: "Start Writing Here...",
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

const TextEditor = () => {
  const dispatch = useAppDispatch();
  const docContent = useAppSelector((state) => state.docContent.docContent);

  const isInstance = React.useRef<EditorJS | null>(null);

  React.useEffect(() => {
    if (!isInstance.current) initEditor();
    return () => {
      if (isInstance.current) {
        isInstance.current.destroy();
        isInstance.current = null;
      }
    };
  }, []); // eslint-disable-line

  const onFileChange = async (file: File) => {
    const form_data = new FormData();
    let preset = process.env.NEXT_PUBLIC_PRESET;
    if (preset) {
      form_data.append("upload_preset", preset);
    }
    if (file) {
      form_data.append("file", file);
      const imageUrl = await CloudImage(form_data);

      if (imageUrl) {
        return imageUrl;
      } else {
        return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
      }
    }
    return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data:
        docContent !== undefined && docContent !== null && docContent.length > 0
          ? JSON.parse(docContent)
          : DEFAULT_INITIAL_DATA(),
      onReady: () => {
        isInstance.current = editor;
      },
      onChange: _(function () {
        try {
          contents();
          setTimeout(() => {
            contents();
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      }, 1500),
      autofocus: true,
      tools: {
        style: StyleInlineTool,
        tooltip: {
          class: Tooltip,
          config: {
            location: "left",
            highlightColor: "#FFEFD5",
            underline: true,
            backgroundColor: "#154360",
            textColor: "#FDFEFE",
            holder: "editorId",
          },
        },

        delimiter: Delimeter,

        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            defaultLevel: 1,
          },
        },

        raw: RawTool,

        linkTool: LinkTool,

        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },

        embed: {
          class: Embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: {
                regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                embedUrl:
                  "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
                html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                height: 300,
                width: 600,
                id: (groups: any[]) => groups.join("/embed/"),
              },
            },
          },
        },

        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                return onFileChange(file).then((imageUrl) => {
                  return {
                    success: 1,
                    file: {
                      url: imageUrl,
                    },
                  };
                });
              },
            },
          },
        },

        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+A",
          config: {
            defaultType: "primary",
            messagePlaceholder: "Enter something",
          },
        },

        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },

        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },

        code: {
          class: CodeTool,
          inlineToolbar: true,
        },
      },
    });

    async function contents() {
      const output = await editor.save();
      const outputString = JSON.stringify(output);
      dispatch(setDocContent(outputString));
    }
  };

  return (
    <>
      <div className={`Editor_class`}>
        <div id={EDITTOR_HOLDER_ID}> </div>
      </div>
    </>
  );
};

export default TextEditor;
