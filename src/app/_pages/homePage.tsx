import React from "react";
import classNames from "classnames";
import { Search, Filter, FAB } from "../_components";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={classNames({
        "relative py-4 pr-4 pl-2": true,
        "flex flex-col items-start justify-start gap-8": true,
        "h-screen w-full": true,
        "overflow-x-hidden": true,
        "dark:bg-gray-900": true,
        "bg-[#fff7e9]": false,
      })}
    >
      <div
        className={classNames({
          "h-[8vh] w-full ml-10 z-[10000]": true,
          "flex items-center justify-start gap-4": true,
          "filter-search-bar:justify-start": true,
          "filter-search-bar:ml-14": true,
          "mobile:-translate-x-5": true,
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
