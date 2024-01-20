import React from "react";
import classNames from "classnames";
import DarkMode from "../DarkMode";
import Image from "next/image";

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
        "bg-transparent w-full relative py-3 h-fit": true, //positioning & styling
        "dark:shadow-[0px_1px_2px_0_rgba(255,255,255,0.1)] shadow": false, //dark-mode and shadow
      })}
    >
      <div className="flex justify-center items-center gap-4">
        <div className="w-[20px] h-[10px]" />
        <Image
          src="/logo.png"
          width={42}
          height={42}
          alt="logo"
          className="dark:invert"
        />
        <h3
          className={classNames({
            "font-bold text-2xl text-primary": true,
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
