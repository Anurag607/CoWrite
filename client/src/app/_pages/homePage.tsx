import React from "react";
import classNames from "classnames";
import { Search, Filter, FAB } from "@/components";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={classNames({
        "relative py-4": true,
        "flex flex-col items-start justify-start gap-8": true,
        "h-screen w-full": true,
        "overflow-x-hidden": true,
        "bg-primary": false,
      })}
    >
      <div
        className={classNames({
          "h-[8vh] mobile:w-screen w-full z-[10000]": true,
          "flex items-start justify-start gap-4": true,
          "mobile:justify-center": true,
        })}
      >
        <Search />
        <Filter />
      </div>
      {children}
      <FAB />
    </div>
  );
};

export default HomePage;
