import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { closeSidebar, openSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { switchEditor } from "@/redux/reducers/toggleEditor";
import { useRouter } from "next-nprogress-bar";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toggleEditor } = useAppSelector((state: any) => state.toggleEditor);
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);

  useOnClickOutside(ref, () => {
    dispatch(closeSidebar());
  });

  React.useEffect(() => {
    if (toggleEditor === "text") return;
    const loading = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    const loaded = setTimeout(() => {
      setIsLoading(false);
      router.push("/codeForge");
    }, 3000);
    return () => {
      clearTimeout(loading);
      clearTimeout(loaded);
    };
  }, [toggleEditor]);

  return (
    <div
      className={classNames({
        "flex items-center justify-center z-[100001]": true,
        "bg-[#37352F] text-zinc-50": true,
        "fixed left-0 top-0": true,
        [`h-screen mobile:w-0 ${
          toggleEditor === "text" ? "w-[5rem]" : "w-screen"
        }`]: true,
        "transition-all ease-in-out": true,
        "bg-center bg-cover bg-no-repeat": true,
        [`${
          isSidebarOpen
            ? "translate-x-0"
            : toggleEditor === "text"
            ? "-translate-x-full"
            : "translate-x-0"
        }`]: true,
      })}
      ref={ref}
    >
      {/* Back Button */}
      <div
        onClick={() => dispatch(isSidebarOpen ? closeSidebar() : openSidebar())}
        className={classNames({
          "w-[42px] h-[42px] mobile:!hidden flex items-center justify-center":
            true,
          "bg-[#e8e8e8] text-neutral-700 rounded-lg left-3": isSidebarOpen,
          "bg-[#37352F] text-[#F7F6F3] rounded-r-lg left-0": !isSidebarOpen,
          "text-3xl rounded-r-lg cursor-pointer": true,
          "fixed top-3 z-[100001] transition-all": true,
          [`${toggleEditor === "code" && "hidden"}`]: true,
        })}
      >
        {isSidebarOpen ? <CaretLeftOutlined /> : <CaretRightOutlined />}
      </div>
      {/* Editor Switch */}
      <div
        className={classNames({
          "flex items-center justify-center gap-x-4 flex-row-reverse": true,
          "-rotate-90 translate-y-[-50%] absolute top-1/2 left-0": true,
          [`${
            toggleEditor === "text"
              ? "translate-x-[-41%]"
              : "translate-x-[-37.5%]"
          }`]: true,
          "transition-all ease-in-out": true,
        })}
      >
        <div
          onClick={() => {
            dispatch(switchEditor(toggleEditor === "code" ? "text" : "code"));
          }}
          className={classNames({
            [`w-[42px] h-[42px] mobile:!hidden flex items-center justify-center ${
              toggleEditor === "text" && "mt-2.5"
            }`]: true,
            "bg-transparent border font-bold border-[#F7F6F3] text-[#F7F6F3] rounded-lg left-3":
              true,
            [`text-3xl rounded-r-lg cursor-pointer ${
              toggleEditor === "text" ? "rotate-90" : "-rotate-90"
            }`]: true,
            "transition-all ease-in-out hover:scale-105": true,
          })}
        >
          <DoubleRightOutlined />
        </div>
        <h1
          className={classNames({
            "bound text-[3rem] tracking-tighter font-bold text-[#F7F6F3]": true,
          })}
        >
          {toggleEditor === "text" ? "CodeForge" : "CoWrite"}
        </h1>
      </div>
      {/* Loader */}
      <div
        className={classNames({
          [`${toggleEditor === "code" ? "flex" : "hidden"}`]: true,
          [`loadingContainer opacity-0 cursor-default transition-all ease-in-out pointer-event-none`]:
            true,
          [`${isLoading ? "opacity-100" : "opacity-0"}`]: true,
        })}
      >
        <div className="row">
          <div className="col dark">
            <div className="loader">
              <span
                data-flicker-0="LOAD"
                data-flicker-1="ING"
                className="loader-text font-bold ml-1"
              >
                LOADING
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
