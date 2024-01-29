import classNames from "classnames";
import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      console.log(outputDetails?.stderr);
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {/* {atob(outputDetails?.stderr)} */}
        </pre>
      );
    }
  };
  return (
    <>
      <h1 className="bound font-bold text-xl text-[#F7F6F3]">Output</h1>
      <div
        className={classNames({
          "w-full h-56 bg-neutral-600 rounded-md overflow-y-auto": true,
          "kanit text-[#F7F6F3] font-normal text-sm": true,
          "shadow-md shadow-neutral-800 transition duration-200": true,
        })}
      >
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
