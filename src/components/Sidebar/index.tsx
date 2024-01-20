import React, { useRef } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import { closeSidebar, openSidebar } from "@/redux/reducers/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

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
        "flex flex-col justify-between z-[1001] relative": true, // layout
        "bg-primary text-zinc-50": true, // colors
        "fixed left-0 top-0": true, // positioning
        "md:h-screen h-full w-[5.5vw] mobile:w-[0vw]": true, // for height and width
        "transition-all": true, //animations
        "bg-center bg-cover bg-no-repeat": true,
        [`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`]: true, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <div
        onClick={() => dispatch(isSidebarOpen ? closeSidebar() : openSidebar())}
        className={classNames({
          "w-[42px] h-[42px] flex items-center justify-center": true,
          "bg-[#e8e8e8] dark:bg-neutral-700 text-neutral-700 dark:text-[#e8e8e8] rounded-lg left-3":
            isSidebarOpen,
          "bg-primary text-mainrounded-r-lg left-0": !isSidebarOpen,
          "text-3xl rounded-r-lg cursor-pointer": true,
          "fixed top-3 z-[100001] transition-all": true,
        })}
      >
        {isSidebarOpen ? <CaretLeftOutlined /> : <CaretRightOutlined />}
      </div>
    </div>
  );
};
export default Sidebar;
