import React from "react";
import classNames from "classnames";
import DarkMode from "../DarkMode";
import Image from "next/image";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { openSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next-nprogress-bar";
import { destroyAuthInstance } from "@/redux/reducers/authSlice";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  const { authInstance } = useAppSelector((state: any) => state.auth);

  React.useEffect(() => {
    if (!authInstance) {
      router.push(`/`);
    }
  }, [authInstance]);

  const isCodeForge = () => {
    return pathname === "/codeForge";
  };

  return (
    <nav
      className={classNames({
        "bg-transparent z-[1000]": true, // colors
        "flex items-center justify-between mobile:px-4 pr-10": true, // layout
        "w-full relative py-3 h-fit": true, //positioning & styling
        "dark:shadow-[0px_1px_2px_0_rgba(255,255,255,0.1)] shadow": false, //dark-mode and shadow
      })}
    >
      <div className="w-fit h-fit flex justify-center items-center gap-4 relative">
        <div
          onClick={() => dispatch(openSidebar())}
          className={classNames({
            "w-[42px] h-[42px] mobile:!hidden flex items-center justify-center":
              true,
            [`${
              !isSidebarOpen
                ? "bg-primary text-main"
                : "bg-[#e8e8e8] text-[#37474f]"
            } text-3xl rounded-r-lg`]: true,
            "z-[100001] transition-all": true,
            "fixed left-0": true,
          })}
        >
          {isSidebarOpen ? <CaretLeftOutlined /> : <CaretRightOutlined />}
        </div>
        <div
          onClick={() => router.push("/")}
          className="w-fit h-fit flex justify-center items-center gap-2 relative cursor-pointer"
        >
          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="logo"
            className="dark:invert sm:w-[42px] sm:h-[42px] w-[32px] h-[32px] cursor-pointer"
          />
          <h3
            className={classNames({
              "bound font-bold text-xl sm:text-2xl text-primary": true,
              "flex justify-center items-center gap-4 cursor-pointer": true,
            })}
          >
            {isCodeForge() ? "CodeForge" : "CoWrite"}
          </h3>
        </div>
      </div>
      <div className={`flex gap-x-2 items-center justify-center`}>
        <DarkMode />
        {authInstance && (
          <button
            onClick={() => {
              dispatch(destroyAuthInstance());
            }}
            className={classNames({
              "text-primary font-normal bound text-[1.75rem]": true,
              "flex justify-center items-center gap-2 cursor-pointer": true,
              "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700":
                true,
              "px-2 py-1 rounded-md": true,
            })}
          >
            <LogoutOutlined />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
