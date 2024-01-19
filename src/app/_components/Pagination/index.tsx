import React, { useRef, useState } from "react";
import { PaginationProps } from "@/app/_utils/types";
import moment from "moment";
import classNames from "classnames";
import { useAppDispatch } from "@/redux/hooks";
import { openUpdateForm } from "@/redux/reducers/formSlice";
import { setFocusedNote } from "@/redux/reducers/noteSlice";

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
    <div className="z-[1000] flex flex-col items-start justify-between relative w-full h-full px-4 mobile:px-0">
      <div className="masonry sm:masonry-sm md:masonry-md space-y-4">
        {paginatedData.map((item, index) => {
          let date = moment
            .unix((item.createdAt as any).seconds)
            .format("MMMM Do YYYY, h:mm:ss a")
            .split(",")[0];
          date =
            monthAbreviations[date.split(" ")[0]] +
            " " +
            date.split(" ")[1] +
            ", " +
            date.split(" ")[2];
          return (
            <div
              key={index}
              className={classNames({
                "relative w-fit h-66 flex flex-col justify-start items-start gap-4":
                  true,
                "rounded-lg shadow-md p-4 break-inside-avoid": true,
                "dark:bg-gray-800 dark:border-gray-700": true,
                "overflow-scroll": false,
                "mobile:w-[95vw]": true,
              })}
              style={{ backgroundColor: item.color }}
            >
              {/* Text... */}
              <div>
                <h4 className="text-gray-900 font-bold">
                  {capitalize(item.title)}
                </h4>
                <h4 className="text-sm text-gray-900 opacity-75 mb-3">
                  {capitalize(item.subtitle)}
                </h4>
                <h4 className="text-sm text-gray-900 font-medium my-3">
                  {item.email}
                </h4>
                <p className="text-gray-900 text-sm">{item.note}</p>
              </div>
              {/* Image... */}
              <div
                className={classNames({
                  hidden: item.image == null,
                  "w-full h-56 rounded-lg": true,
                  "bg-transparent bg-cover bg-no-repeat bg-center": true,
                })}
                style={{ backgroundImage: "url('" + item.image + "')" }}
              />
              {/* Date... */}
              <div
                className={classNames({
                  "flex items-center justify-start gap-8": true,
                  "text-gray-800": true,
                })}
              >
                <p className="text-sm mt-4 font-bold">{date}</p>
              </div>
              {/* Edit Button... */}
              <button
                role="button"
                aria-label="edit note"
                onClick={() => {
                  dispatch(setFocusedNote(item));
                  dispatch(openUpdateForm());
                }}
                className={classNames({
                  "absolute bottom-4 right-4": true,
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
              </button>
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
      <div className="w-full h-fit flex justify-center mt-4 pb-10">
        <button
          disabled={currentPage === 1}
          className={`mx-1 px-2 py-1 rounded-full bg-[#ff9b73] dark:bg-blue-400 text-white ${
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
                currentPage === index + 1
                  ? "bg-[#ff9b73] dark:bg-blue-400 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          className={`mx-1 px-2 py-1 rounded-full bg-[#ff9b73] dark:bg-blue-400 text-white ${
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
