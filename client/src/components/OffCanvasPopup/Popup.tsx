import React from "react";

const Popup = ({ content }: { content: string }) => {
  return (
    <div className="w-full relative h-full animate-pulse">
      <div className="h-[15.5rem] bg-gray-200 dark:bg-neutral-400 rounded-md mb-2.5" />
      <div className="bg-gray-200 dark:bg-neutral-400 rounded-full w-48 h-[0.5rem] mx-auto mb-2.5" />
      <div className="h-12 bg-gray-200 dark:bg-neutral-400 rounded-md" />
    </div>
  );
};

export default Popup;
