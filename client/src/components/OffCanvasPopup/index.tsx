"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import useWindowSize from "@/custom-hooks/useWindowResize";

const OffCanvasPopup = () => {
  const [width, height] = useWindowSize();
  const [switchToBottom, setSwitchToBottom] = useState(false);

  useEffect(() => {
    if (width <= 475) {
      setSwitchToBottom(true);
    } else {
      setSwitchToBottom(false);
    }
  }, [width]);

  return (
    <div>
      {typeof window === "undefined" ? (
        <></>
      ) : switchToBottom ? (
        <Bottombar />
      ) : (
        <Sidebar />
      )}
    </div>
  );
};

export default OffCanvasPopup;
