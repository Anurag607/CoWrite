import React from "react";
import classNames from "classnames";
import DarkMode from "../DarkMode";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const Navbar = () => {
  return (
    <nav
      className={classNames({
        "bg-transparent z-[1000]": true, // colors
        "flex items-center justify-between pr-10": true, // layout
        "w-full relative shadow py-3 h-fit": true, //positioning & styling
        "dark:bg-gray-900 dark:shadow-[0px_1px_2px_0_rgba(255,255,255,0.1)]":
          true, //dark-mode
      })}
    >
      <div className="flex justify-center items-center gap-4">
        <div className="w-[20px] h-[10px]" />
        <img src="/logo.png" width={42} height={42} alt="logo" />
        <h3
          className={classNames({
            "font-bold text-2xl text-[#ff9b73] dark:text-white": true,
            "flex justify-center items-center gap-4": true,
          })}
        >
          NoteWave
        </h3>
      </div>
      <div className="-translate-y-[4px]">
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
