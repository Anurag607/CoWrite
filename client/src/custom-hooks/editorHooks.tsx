import { useCallback, useState, useEffect } from "react";
import EditorData from "@/utils/Editor/data.json";

export const dataKey = "editorData";

export const useSaveCallback = (editor: any) => {
  return useCallback(async () => {
    if (!editor) return;
    try {
      const out = await editor.save();
      console.group("EDITOR onSave");
      console.dir(out);
      localStorage.setItem(dataKey, JSON.stringify(out));
      console.info("Saved in localStorage");
      console.groupEnd();
    } catch (e) {
      console.error("SAVE RESULT failed", e);
    }
  }, [editor]);
};

// Set editor data after initializing
export const useSetData = (editor: any, data: any) => {
  useEffect(() => {
    if (!editor || !data) {
      return;
    }

    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        editor.render(data);
      }, 100);
    });
  }, [editor, data]);
};

export const useClearDataCallback = (editor: any) => {
  return useCallback(() => {
    if (!editor) {
      return;
    }
    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        editor.clear();
      }, 100);
    });
  }, [editor]);
};

// load saved data
export const useLoadData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const toggle = 1;

  // Mimic async data load
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      console.group("EDITOR load data");
      const saved = localStorage.getItem(dataKey);
      if (saved) {
        let parsed = JSON.parse(saved);
        if (typeof parsed === "string") parsed = JSON.parse(parsed);
        if (
          parsed &&
          parsed.hasOwnProperty("blocks") &&
          parsed.blocks.length > 0
        )
          setData(parsed);
        else setData(EditorData[toggle ? "INITIAL_DATA" : "SAMPLE_DATA"]);
      } else {
        console.info("No saved data, using initial");
        console.log(EditorData[toggle ? "INITIAL_DATA" : "SAMPLE_DATA"]);
        setData(EditorData[toggle ? "INITIAL_DATA" : "SAMPLE_DATA"]);
      }
      console.groupEnd();
      setLoading(false);
    }, 200);

    return () => {
      setLoading(false);
      clearTimeout(id);
    };
  }, []);

  return { data, loading };
};
