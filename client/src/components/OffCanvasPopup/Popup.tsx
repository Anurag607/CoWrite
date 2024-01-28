import { ToastConfig } from "@/utils/config";
import React from "react";
import { toast } from "react-toastify";

const LoadingSkeleton = () => {
  return (
    <div className="w-full relative h-full animate-pulse">
      <div className="h-[15.5rem] bg-gray-200 dark:bg-neutral-400 rounded-md mb-2.5" />
      <div className="bg-gray-200 dark:bg-neutral-400 rounded-full w-48 h-[0.5rem] mx-auto mb-2.5" />
      <div className="h-12 bg-gray-200 dark:bg-neutral-400 rounded-md" />
    </div>
  );
};

const Popup = ({ content }: { content: string }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [prompt, setPrompt] = React.useState<string>("");
  const [response, setResponse] = React.useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (data.hasOwnProperty("msg") && data.msg.hasOwnProperty("id")) {
      setResponse(data.msg.choices[0].message.content);
    } else {
      toast.error("Something went wrong!", ToastConfig);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full relative h-full">
      <textarea
        disabled={true}
        value={response ? response : ""}
        className={`h-[15rem] w-full resize-none bg-gray-200 dark:bg-neutral-400 rounded-md mb-2 p-3 ${
          isLoading && " animate-pulse cursor-default"
        }`}
      />
      <div
        className={`bg-gray-200 dark:bg-neutral-400 rounded-full w-48 h-[0.5rem] mx-auto mb-2.5 ${
          isLoading && " animate-pulse"
        }`}
      />
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            disabled={isLoading}
            maxLength={50}
            id="default-search"
            className={`${
              isLoading && "opacity-50 pointer-events-none"
            } kanit block w-full p-4 cursor-text text-sm text-primary rounded-lg bg-neutral-200 dark:bg-neutral-600 outline-none border-2 dark:border-none`}
            placeholder="Type your prompt..."
            value={prompt}
            onChange={(e) => {
              e.preventDefault();
              setPrompt(e.target.value);
              if (e.target.value.length === 0) {
                setResponse(null);
              }
            }}
            required
          />
          <button
            type="submit"
            disabled={prompt.length === 0 || isLoading}
            className={`kanit ${
              (prompt.length === 0 || isLoading) &&
              "opacity-50 pointer-events-none"
            } text-main absolute end-2.5 bottom-2.5 bg-primary hover:bg-hover font-medium rounded-lg text-sm px-4 py-2`}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
