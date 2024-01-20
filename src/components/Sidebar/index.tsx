import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { closeSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const Sidebar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state: any) => state.sidebar);
  useOnClickOutside(ref, () => {
    dispatch(closeSidebar());
  });

  return (
    <div
      className={classNames({
        "flex flex-col justify-between z-[1001]": true, // layout
        "bg-[#faaa73] dark:bg-indigo-700 text-zinc-50": true, // colors
        "fixed left-0 top-0": true, // positioning
        "md:h-screen h-full w-[35px] mobile:w-0": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "bg-center bg-cover bg-no-repeat": true,
        "-translate-x-full ": !isSidebarOpen, //hide sidebar to the left when closed
        "gradient-background": true,
      })}
      ref={ref}
    >
      <div className="md:sticky top-0 md:top-16" />
    </div>
  );
};
export default Sidebar;
