"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { languageOptions } from "@/utils/CodeEditor/languageOptions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "@/utils/CodeEditor/defineTheme";
import useKeyPress from "@/custom-hooks/useKeyPress";
import {
  CodeEditorWindow,
  CustomInput,
  LanguagesDropdown,
  OutputWindow,
  OutputDetails,
  ThemeDropdown,
} from "@/components";
import { ToastConfig } from "@/utils/config";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const cppDefault = `
#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Welcome To CodeForge!" << endl;
}
`;

const Page = () => {
  const [code, setCode] = useState(localStorage.getItem("code"));
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({ value: "cobalt", label: "Cobalt" });
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (code === null || code === undefined) {
      localStorage.setItem("code", cppDefault);
      setCode(cppDefault);
    }
  }, [code]);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        localStorage.setItem("code", data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    axios
      .post("/api/compiler", formData)
      .then(function (response) {
        if (response.data.status === 400) {
          showErrorToast("Failed to compile! Please try again.");
          setProcessing(false);
          return;
        }
        const token = response.data.msg.token;
        // console.log("token", token);
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          // console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`
          );
        }
        setProcessing(false);
        // console.log("catch block...", error);
      });
  };

  const checkStatus = async (token: any) => {
    try {
      let response = await axios.get(`/api/compiler/${token}`);
      let statusId = response.data.msg.status?.id;
      console.log("statusId", statusId);

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data.msg);
        showSuccessToast(`Compiled Successfully!`);
        // console.log("checkStatus Data: ", response.data);
        return;
      }
    } catch (err) {
      // console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg: string) => {
    toast.success(msg || `Compiled Successfully!`, ToastConfig);
  };

  const showErrorToast = (msg?: any) => {
    toast.error(msg || `Something went wrong! Please try again.`, ToastConfig);
  };

  return (
    <div
      className={classNames({
        "bg-[#37352F] kanit w-screen h-fit md:h-screen p-4 relative": true,
        "flex flex-col items-start justify-start gap-y-4": true,
      })}
    >
      {/* Header... */}
      <div className="flex flex-wrap items-start justify-start gap-4 w-full h-fit relative">
        <LanguagesDropdown onSelectChange={onSelectChange} />
        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
      </div>
      {/* Layout... */}
      <div className="flex flex-col md:flex-row items-start justify-start gap-4 w-full h-fit relative">
        <div className="relative h-fit w-full md:w-2/3 text-white">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-y-4  w-full md:w-auto flex-[1] h-fit relative">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end w-full h-full relative">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classNames({
                "block rounded-full w-fit hover:bg-[#000000]": true,
                "mt-4 py-2 px-8": true,
                "font-medium bound text-[#F7F6F3] tracking-wider text-lg": true,
                "border-2 border-[#F7F6F3]": true,
                "hover:scale-[1.05] transition-all ease-in-out": true,
              })}
            >
              {processing ? "Processing..." : "Run"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </div>
  );
};
export default Page;
