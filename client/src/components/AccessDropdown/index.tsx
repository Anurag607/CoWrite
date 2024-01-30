import React from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import classNames from "classnames";
import { ToastConfig } from "@/utils/config";
import { CloseCircleFilled } from "@ant-design/icons";
import { setFocusedDoc } from "@/redux/reducers/docSlice";

const showError = (msg: string) => toast.error(msg, ToastConfig);

const AccessDropdown = () => {
  const dispatch = useAppDispatch();
  const { focusedDoc } = useAppSelector((state: any) => state.docs);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [revokeAccess, setRevokeAccess] = React.useState([]);
  const { authInstance } = useAppSelector((state: any) => state.auth);

  const handleAccessChange = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (email.length === 0 && revokeAccess.length === 0) {
      showError("Please enter an email or revoke access to a user");
      setIsLoading(false);
      return;
    }
    let new_access = [...focusedDoc.access, email];
    new_access = new_access.filter((e: string) => !revokeAccess.includes(e));
    const res = await fetch(`/api/document/update/${focusedDoc._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...focusedDoc,
        user: authInstance.email,
        access: new_access,
      }),
    });
    const data = await res.json();
    if (data.status === 202) {
      toast.success("Access List Updated", ToastConfig);
      dispatch(setFocusedDoc({ ...focusedDoc, access: new_access }));
      setEmail("");
      setRevokeAccess([]);
      setIsMenuOpen(false);
    } else if (data.status === 404 || data.status === 401) {
      showError(data.message);
    } else {
      showError("Failed to Update Access List, Please try again!");
    }
    setIsLoading(false);
  };

  return (
    <div className="z-[10] inline-block kanit relative">
      {/* Manage Access Button */}
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={classNames({
          "text-primary font-normal bound text-sm": true,
          "mobile-sm:hidden flex justify-center items-center gap-2 cursor-pointer":
            true,
          "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700": true,
          "px-2 py-1 mt-2 rounded-md": true,
        })}
      >
        <span className="pr-1 font-semibold flex-1 cursor-pointer">
          {"Manage Access"}
        </span>
        <span>
          <svg
            className={classNames({
              [`fill-current h-4 w-4 ${isMenuOpen && "-rotate-180"}`]: true,
              "transform transition duration-150 ease-in-out": true,
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </div>
      {/* Manage Access Menu */}
      <div
        className={classNames({
          "absolute top-full -left-full mobile:right-0": true,
          "flex flex-col items-start justify-start": true,
          "w-[17.5rem] h-fit p-3": true,
          [`scale-0 ${isMenuOpen && "scale-100"}`]: true,
          "transition-all duration-150 ease-in-out origin-top-right": true,
          "bg-main rounded-lg border dark:border-neutral-900 shadow-lg translate-y-1":
            true,
        })}
      >
        <div className="relative mb-4 mt-2 w-full">
          <input
            type="text"
            id={"Give Access"}
            name={"Give Access"}
            value={email}
            className={classNames({
              "block px-2.5 pb-2.5 pt-4 w-full": true,
              "text-sm text-gray-900 bg-gray-100 dark:bg-neutral-700": true,
              "rounded-lg border-1 border-gray-900": true,
              "appearance-none dark:text-white": true,
              "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                true,
            })}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            placeholder=" "
          />
          <label
            htmlFor={"Give Access"}
            className={classNames({
              "absolute top-2 left-1": true,
              "z-10 origin-[0] px-2": true,
              "peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500":
                true,
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2":
                true,
              "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4":
                true,
              "bg-transparent": true,
              "text-sm text-gray-500 dark:text-gray-400": true,
              "duration-300 transform -translate-y-4 scale-75": true,
            })}
          >
            {"Give Access (Email)"}
          </label>
        </div>
        {/* Revoke Access Container */}
        <RevokeAccess
          data={focusedDoc.access}
          revokeAccess={revokeAccess}
          setRevokeAccess={setRevokeAccess}
        />
        {/* Update Access Button */}
        <div className="mt-4 w-full flex items-center justify-end">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleAccessChange}
              className={classNames({
                "cursor-default pointer-events-none": isLoading,
                "px-4 py-2 rounded-md focus:outline-none border": true,
                "bg-gray-900 text-[#e8e8e8] dark:bg-[#e8e8e8] dark:text-gray-900":
                  true,
                "hover:!bg-transparent hover:text-primary hover:border-primary hover:dark:text-[#e8e8e8]":
                  true,
              })}
            >
              {"Update Access"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const RevokeAccess = ({ data, revokeAccess, setRevokeAccess }) => {
  const [isRevoke, setIsRevoke] = React.useState(false);
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [search, setSearch] = React.useState("");

  const removeFromList = (e: React.MouseEvent<HTMLElement>, email: string) => {
    e.preventDefault();
    setRevokeAccess((prev: string[]) => prev.filter((e) => e !== email));
  };

  const handleOnSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const email = e.currentTarget.value;
    if (revokeAccess.includes(email))
      setRevokeAccess((prev: string[]) =>
        prev.filter((e: string) => e !== email)
      );
    else setRevokeAccess((prev: string[]) => [...prev, email]);
  };

  return (
    <div className={"text-primary text-lg w-full h-fit relative"}>
      <div
        className={classNames({
          "w-full flex items-center justify-between": true,
          "cursor-pointer": true,
        })}
        onClick={() => setIsRevoke((prev) => !prev)}
      >
        <span className="text-md">Revoke Access</span>
        <svg
          className={classNames({
            [`fill-current h-4 w-4 ${isRevoke && "-rotate-180"}`]: true,
            "transform transition duration-150 ease-in-out": true,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {/* Revoked Access List */}
      <div
        className={
          "flex w-full h-fit flex-wrap justify-start items-center gap-2 mt-1"
        }
      >
        {revokeAccess.map((email, idx) => {
          return (
            <span
              key={idx}
              className={classNames({
                "bg-[#1a1a1a] dark:bg-primary": true,
                "flex items-center justify-center gap-x-2": true,
                "text-sm text-main kanit": true,
                "px-2 py-1 rounded-full cursor-default": true,
              })}
            >
              <CloseCircleFilled
                onClick={(e) => removeFromList(e, email)}
                className="cursor-pointer"
              />
              <p className={"text-main"}>{email.split("@")[0]}</p>
            </span>
          );
        })}
      </div>
      {/* Access List Container */}
      <div
        className={classNames({
          "mt-2 flex flex-col items-start justify-start gap-y-2 relative": true,
          [`w-full h-0 p-0 mt-4 ${isRevoke && "!h-[9rem] p-2"}`]: true,
          "transition-all duration-150 ease-in-out origin-top": true,
          "bg-neutral-100 dark:bg-neutral-600 rounded-lg overflow-y-auto overflow-clip":
            true,
        })}
      >
        {/* Search... */}
        <div className="w-full relative">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>
          <div className="w-full relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classNames({
                "block ps-10 p-2.5 w-full": true,
                "text-sm text-gray-900 bg-gray-200 dark:bg-neutral-700": true,
                "rounded-lg border-1 border-gray-900": true,
                "appearance-none dark:text-white": true,
                "dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer":
                  true,
              })}
              placeholder="Search user"
            />
          </div>
        </div>
        {/* Access List */}
        {(search.length === 0
          ? data
          : data.filter((el: string) => el.includes(search))
        ).map((email: string, idx: number) => {
          if (revokeAccess.includes(email) || email === authInstance.email)
            return null;
          return (
            <div key={idx} className="flex items-center">
              <input
                id={email}
                name={email}
                value={email}
                type="checkbox"
                onClick={handleOnSelect}
                className="w-5 h-5 ml-3"
              />
              <label
                htmlFor="checkbox-item-11"
                className="w-full ms-2 font-medium text-prmary truncate"
              >
                {email.split("@")[0]}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessDropdown;
