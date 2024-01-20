import React from "react";
import classNames from "classnames";
import DarkMode from "../DarkMode";
import Image from "next/image";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { openSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);

  return (
    <nav
      className={classNames({
        "bg-transparent z-[1000]": true, // colors
        "flex items-center justify-between mobile:px-4 pr-10": true, // layout
        "bg-transparent w-full relative py-3 h-fit": true, //positioning & styling
        "dark:shadow-[0px_1px_2px_0_rgba(255,255,255,0.1)] shadow": false, //dark-mode and shadow
      })}
    >
      <div className="w-fit h-fit flex justify-center items-center gap-4 relative">
        <div
          onClick={() => dispatch(openSidebar())}
          className={classNames({
            "w-[42px] h-[42px] mobile:hidden flex items-center justify-center":
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
        <div className="w-fit h-fit flex justify-center items-center gap-2 relative">
          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="logo"
            className="dark:invert sm:w-[42px] sm:h-[42px] w-[32px] h-[32px]"
          />
          <h3
            className={classNames({
              "rubik font-bold text-xl sm:text-2xl text-primary": true,
              "flex justify-center items-center gap-4": true,
            })}
          >
            CoWrite
          </h3>
        </div>
      </div>
      <div className="-translate-y-[4px]">
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
