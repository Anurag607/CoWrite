import React, { useRef, useState } from "react";
import { PaginationProps } from "@/utils/types";
import moment from "moment";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openUpdateForm } from "@/redux/reducers/formSlice";
import {
  alterDocAPI,
  setCurrentDoc,
  setFocusedDoc,
} from "@/redux/reducers/docSlice";
import { FileTextFilled } from "@ant-design/icons";
import { useRouter } from "next-nprogress-bar";
import { dataKey } from "@/custom-hooks/editorHooks";

const monthAbreviations = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
} as any;

const capitalize = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Pagination = ({ data, itemsPerPage }: PaginationProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const sliderRef = useRef(null);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {}, [currentPage]);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="z-[1000] flex flex-col items-start justify-between relative w-full h-full">
      <div className="flex flex-wrap mobile:justify-center items-start justify-start gap-7 w-full relative">
        {paginatedData.map((item, index) => {
          let timeStamp: string | Date = item.createdAt;
          if (typeof timeStamp === "string") {
            timeStamp = new Date(timeStamp);
          }
          let date = moment
            .unix(timeStamp.getTime() / 1000)
            .format("MMMM Do YYYY, h:mm:ss a")
            .split(",")[0];
          date =
            monthAbreviations[date.split(" ")[0]] +
            " " +
            date.split(" ")[1] +
            ", " +
            date.split(" ")[2];
          return (
            // Cards...
            <div
              key={index}
              className={classNames({
                "relative mobile-sm:w-[85vw] w-[15rem] h-[17.5rem]": true,
                "flex flex-col justify-start items-start gap-4": true,
                "rounded-lg shadow-md p-4": true,
              })}
              style={{ backgroundColor: item.color }}
            >
              {/* Text... */}
              <div className={"w-full relative"}>
                <p className="text-gray-900 font-bold text-ellipsis overflow-hidden w-[85%] kanit">
                  {capitalize(item.title)}
                </p>
                <p className="text-neutral-900 opacity-75 text-xs text-ellipsis overflow-hidden w-[85%] kanit">
                  {item.owner}
                </p>
              </div>
              {/* Image... */}
              {item.descImg && !item.descImg.includes("blob:") ? (
                <div
                  className={classNames({
                    "w-full h-56 rounded-lg": true,
                    "bg-transparent bg-cover bg-no-repeat bg-center": true,
                  })}
                  style={{ backgroundImage: "url('" + item.descImg + "')" }}
                />
              ) : (
                <div
                  className={classNames({
                    "w-full h-56 rounded-lg": true,
                    "bg-cover bg-no-repeat bg-center": true,
                    "bg-neutral-100 bg-opacity-60": true,
                    "flex items-center justify-center": true,
                  })}
                >
                  <p
                    className={"kanit text-xl font-bold text-neutral-700"}
                  >{`Document ${index + 1}`}</p>
                </div>
              )}
              {/* Date... */}
              <div
                className={classNames({
                  "flex items-center justify-start gap-8": true,
                  "text-gray-800": true,
                })}
              >
                <p className="text-sm mt-4 font-bold kanit">{date}</p>
              </div>
              <div className="flex items-center justify-end gap-x-3">
                {/* Doc Button... */}
                <button
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(alterDocAPI("update"));
                    dispatch(setFocusedDoc(item));
                    localStorage.setItem(dataKey, JSON.stringify(item.content));
                    const data = {
                      id: item._id,
                      title: item.title,
                      emailID: item.owner,
                      color: item.color,
                      pinned: item.pinned,
                      descImg: item.descImg,
                      content: item.content,
                      createdAt: item.createdAt,
                      updatedAt: item.updatedAt,
                    };
                    dispatch(setCurrentDoc(data));
                    router.push(
                      `/document/${authInstance._id}?docId=${item._id}`
                    );
                  }}
                  aria-label="edit doc"
                  className={classNames({
                    "absolute bottom-4 right-14 group": true,
                    "flex items-center justify-center": true,
                    "w-8 h-8 rounded-full text-white bg-gray-800": true,
                    "dark:bg-gray-100 dark:text-gray-800": false,
                  })}
                >
                  <FileTextFilled />
                  <span
                    className={
                      "absolute top-[-130%] opacity-75 w-fit h-fit px-2 py-1 text-xs rounded-md bg-primary text-main scale-0 group-hover:scale-100"
                    }
                  >
                    {"View Document"}
                  </span>
                </button>
                {/* Edit Button... */}
                <button
                  role="button"
                  aria-label="edit doc"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setFocusedDoc(item));
                    dispatch(setCurrentDoc(item));
                    dispatch(openUpdateForm());
                  }}
                  className={classNames({
                    "absolute bottom-4 right-4 group": true,
                    "flex items-center justify-center": true,
                    "w-8 h-8 rounded-full text-white bg-gray-800": true,
                    "dark:bg-gray-100 dark:text-gray-800": false,
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pencil"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                  </svg>
                  <span
                    className={
                      "absolute top-[-130%] opacity-75 w-fit h-fit px-2 py-1 text-xs rounded-md bg-primary text-main scale-0 group-hover:scale-100"
                    }
                  >
                    {"Update Document"}
                  </span>
                </button>
              </div>
              {/* Pinned Indicator... */}
              {item.pinned && (
                <img
                  src={"/pin-1.png"}
                  className="absolute top-4 right-4 w-6 h-6"
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Pages... */}
      <div className="w-full h-fit flex justify-center mt-4 pb-10 sm:pb-0">
        <button
          disabled={currentPage === 1}
          className={`mx-1 px-2 py-1 rounded-full bg-primary text-main ${
            currentPage === 1 ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            handlePageChange(currentPage - 1);
            if (currentPage >= 4) {
              (sliderRef.current as any).scrollLeft -= 33;
            }
          }}
        >
          {"<"}
        </button>
        <div
          ref={sliderRef}
          className={`flex items-center justify-start gap-2 ${
            totalPages >= 3 ? "w-[5.35rem]" : "w-fit"
          } bg-transparent overflow-x-scroll realtive whitespace-nowrap scroll-smooth`}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-2 py-1 rounded-full transition ease-out duration-200 ${
                currentPage === index + 1 ? "bg-primary text-main" : "bg-main"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          className={`mx-1 px-2 py-1 rounded-full bg-primary text-main ${
            currentPage === totalPages ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => {
            handlePageChange(currentPage + 1);
            if (currentPage >= 3) {
              (sliderRef.current as any).scrollLeft += 33;
            }
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
