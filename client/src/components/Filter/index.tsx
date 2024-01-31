import React from "react";
import classNames from "classnames";
import {
  openFilter,
  closeFilter,
  setFilterValue,
} from "@/redux/reducers/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { setDocData } from "@/redux/reducers/docSlice";
import { FilterOutlined } from "@ant-design/icons";

const colors = [
  "#e8e8e8",
  "#faaa73",
  "#fef595",
  "#bbf7d0",
  "#bae6fd",
  "#fecaca",
];

const Filter = () => {
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  const { isFilterOpen } = useAppSelector((state: any) => state.filter);
  const { docData } = useAppSelector((state: any) => state.docs);

  useOnClickOutside(ref, () => {
    dispatch(closeFilter());
  });

  const ClickEventHandler = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    dispatch(setFilterValue(target.dataset.value));
    dispatch(closeFilter());
  };

  return (
    <div
      ref={ref}
      className={classNames({
        "relative flex items-center justify-center": true,
        "cursor-pointer": true,
      })}
    >
      <button
        className={classNames({
          "cursor-pointer": true,
          "bg-white": true,
          "py-[0.1rem] px-[0.15rem] rounded-md": true,
          "border-2 border-zinc-200": true,
          "mt-1": true,
        })}
      >
        <FilterOutlined
          className="h-6 w-6 cursor-pointer z-[1000]"
          onClick={() => {
            !isFilterOpen ? dispatch(openFilter()) : dispatch(closeFilter());
          }}
        />
      </button>
      <div
        className={classNames({
          "flex flex-col justify-start items-start pr-2.5 overflow-hidden":
            true,
          "z-[1000001] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-neutral-800":
            true,
          "absolute top-[2.75rem] right-2": true,
          "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
          "w-0 py-0": !isFilterOpen,
        })}
      >
        <li
          className={classNames({
            "bg-primary text-main": true, //colors
            "flex gap-4 items-center justify-center w-[92.5%]": true, //layout
            "transition-colors duration-300": true, //animation
            "rounded-md p-2 mx-2 mb-2": true, //self style
            "cursor-pointer": true,
            "py-1 my-1": true,
            "flex items-center justify-start": true, //layout
            hidden: !isFilterOpen,
          })}
          onClick={() => {
            dispatch(setFilterValue(""));
            dispatch(setDocData(docData));
            dispatch(closeFilter());
          }}
        >
          {"Clear"}
        </li>
        {colors.map((item: any, index: number) => {
          return (
            <div
              key={index}
              data-value={item}
              className={classNames({
                "h-8 w-[92.5%] border-none": true, //layout
                "rounded-md p-2 mx-2 mb-2": true, //self style
                "cursor-pointer": true,
                "py-1": true,
                "flex items-center justify-start": true, //layout
                hidden: !isFilterOpen,
              })}
              style={{ backgroundColor: item }}
              onClick={ClickEventHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
