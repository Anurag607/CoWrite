"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { languageOptions } from "@/utils/CodeEditor/languageOptions";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
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
import { useRouter } from "next-nprogress-bar";
import { useAppSelector } from "@/redux/hooks";
import { CaretLeftOutlined, CaretUpOutlined } from "@ant-design/icons";
import { setShowBottomBar, setShowSidebar } from "@/redux/reducers/drawerSlice";
import { useAppDispatch } from "@/redux/hooks";
import { removeClient, setClient } from "@/redux/reducers/clientSlice";

const cppDefault = `
#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Welcome To CodeForge!" << endl;
}
`;

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId;
  const dispatch = useAppDispatch();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const { userData } = useAppSelector((state: any) => state.code);
  const { clients } = useAppSelector((state: any) => state.client);
  const [code, setCode] = useState(localStorage.getItem("code"));
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({ value: "cobalt", label: "Cobalt" });
  const [language, setLanguage] = useState(languageOptions[0]);
  const [socket, setSocket] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const handler = (delta: any) => {
    if (delta.room !== roomId) return;
    if (
      delta.data === null ||
      delta.data === undefined ||
      delta.data.length === 0
    )
      return;
    setCode(delta.data);
    localStorage.setItem("code", delta.data);
  };

  // Initializing Socket and Cleanup...
  useEffect(() => {
    dispatch(setClient(userData.username));
    if (!socket) {
      let socket = io(process.env.NEXT_PUBLIC_RENDER_SERVER);
      setSocket(socket);
    }

    return () => {
      if (socket) socket.disconnect();
      setSocket(null);
    };
  }, []);

  // Socket Connections...
  useEffect(() => {
    if (!socket) return;

    socket.emit("updating-document", {
      id: socket.id,
      documentId: roomId,
      user: userData.username,
      email: authInstance.email,
    });
    socket.on("update-clients", (newUser: any) => {
      if (newUser.currentDocument === roomId) dispatch(setClient(newUser.name));
    });
    socket.on("disconnect", (newUser: any) => {
      if (newUser.currentDocument === roomId)
        dispatch(removeClient(newUser.name));
      socket.emit("disconnecting-document", {
        id: socket.id,
        currentDocument: roomId,
        user: userData.username,
        email: authInstance.email,
      });
    });
    socket.on("remove-clients", (newUser: any) => {
      if (newUser.currentDocument === roomId)
        dispatch(removeClient(newUser.name));
    });
    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [socket, roomId]);

  useEffect(() => {
    if (!authInstance) {
      router.push(`/`);
    }
  }, [authInstance]);

  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (code === null || code === undefined) {
      localStorage.setItem("code", cppDefault);
      setCode(cppDefault);
      location.reload();
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
        socket.emit("send-changes", data);
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
    <>
      <div
        className={classNames({
          "bg-[#37352F] kanit w-screen h-fit md:h-screen p-4 relative": true,
          "flex flex-col items-start justify-start gap-y-4": true,
        })}
      >
        {/* Header... */}
        <div className="flex flex-wrap items-start justify-between mobile:ps-0 ps-10 gap-4 w-full h-fit relative">
          <div className="flex flex-wrap items-start justify-start gap-4 w-fit h-fit relative">
            <LanguagesDropdown onSelectChange={onSelectChange} />
            <ThemeDropdown
              handleThemeChange={handleThemeChange}
              theme={theme}
            />
          </div>
          <div
            className={
              "w-fit h-fit flex items-center justify-end gap-x-2 mobile:mr-0 mr-10 overflow-x-auto"
            }
          >
            {clients.map((el: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`bg-[#37352F] rounded-md mobile:p-0 mobile:px-2 p-2 px-4 mobile:border-2 border-4 border-[#F7F6F3] shadow-lg group relative`}
                >
                  <h4 className={`text-main mobile:text-md text-lg font-bold`}>
                    {el[0].toUpperCase()}
                  </h4>
                  <span
                    className={
                      "absolute break-before-avoid bottom-[-60%] right-0 opacity-75 w-fit h-fit px-2 py-1 text-xs rounded-md bg-[#37352F] text-white scale-0 group-hover:scale-100"
                    }
                  >
                    {el}
                  </span>
                </div>
              );
            })}
          </div>
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
                  "font-medium bound text-[#F7F6F3] tracking-wider text-lg":
                    true,
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
      <div
        onClick={() => {
          dispatch(setShowBottomBar([true, ""]));
          dispatch(setShowSidebar([true, ""]));
        }}
        className={classNames({
          "mobile:w-[32px] mobile:h-[32px] w-[42px] h-[42px] mobile:hidden flex items-center justify-center":
            true,
          [`bg-[#F7F6F3] text-neutral-700 mobile:text-[0.95rem] text-3xl rounded-l-lg`]:
            true,
          "z-[100001] transition-all": true,
          "fixed right-0 top-[5%]": true,
        })}
      >
        <CaretLeftOutlined />
      </div>
      <div
        onClick={() => {
          dispatch(setShowBottomBar([true, ""]));
          dispatch(setShowSidebar([true, ""]));
        }}
        className={classNames({
          "mobile:w-[32px] mobile:h-[32px] w-[42px] h-[42px] hidden mobile:flex items-center justify-center":
            true,
          [`bg-[#F7F6F3] text-neutral-700 mobile:text-[0.95rem] text-xl rounded-t-lg`]:
            true,
          "z-[100001] transition-all": true,
          "fixed bottom-0 right-[30%]": true,
        })}
      >
        <CaretUpOutlined />
      </div>
    </>
  );
};
export default Page;
