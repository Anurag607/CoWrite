import { useEffect, useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthInstance } from "@/redux/reducers/authSlice";
import Link from "next/link";
import { ToastConfig } from "@/utils/config";

const showError = (msg: string) => toast.error(msg, ToastConfig);

const Register = () => {
  const dispatch = useAppDispatch();
  const { authInstance } = useAppSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (authInstance) {
      router.push(`/dashboard/${authInstance._id}`);
    }
  }, [authInstance]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (formData.email.length == 0) {
      showError("Please enter a valid Email.");
      return;
    }
    if (formData.password.length == 0) {
      showError("Please enter a valid Password.");
      return;
    }

    e.preventDefault();
    setIsLoading(true);

    const fetcher = await fetch(`/api/auth/register`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(formData),
    });

    const res = await fetcher.json();
    if (res.status == 200) {
      toast.success("Sign Up Successfull.", ToastConfig);
      dispatch(setAuthInstance(res.data));
      router.push(`/dashboard/${res.data._id}`);
    } else if (res.status == 404) {
      showError(res.msg);
    } else {
      showError("Sign Up Failed. Please try again!");
    }

    setIsLoading(false);
  };

  const togglePassword = () => {
    let passwordInputField = passwordRef.current as any;
    if (passwordInputField.type === "password") {
      passwordInputField.type = "text";
    } else {
      passwordInputField.type = "password";
    }
  };

  return (
    <div
      className={classNames({
        "relative w-screen h-screen": true,
        "flex flex-row-reverse items-start justify-center": true,
        "bg-sidebar md:px-10": true,
      })}
    >
      {/* Image Section */}
      <section
        className={classNames({
          "relative rounded-xl w-[47.5%] h-full": true,
          "hidden md:flex": true,
          "flex-col justify-center items-center": true,
        })}
      >
        <div
          className={classNames({
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2":
              !true,
            "rounded-xl w-[90%] h-[90%] z-10": true,
            "flex flex-col justify-center items-center": true,
            "bg-top bg-no-repeat bg-cover": true,
          })}
          style={{ backgroundImage: "url(/bg-register.jpg)" }}
        >
          <div
            className={classNames({
              "relative z-[20] w-fit mr-10": true,
              "flex flex-col justify-center items-start": true,
              "text-neutral-800": true,
            })}
          >
            <h1 className="bound lg:text-[3rem] text-[2.25rem] drop-shadow-xl">
              {"CoWrite"}
            </h1>
            <h1
              className={classNames({
                "px-3 py-1": true,
                "mento text-3xl text-gray-100": true,
                "shadow-xl bg-black ": true,
              })}
            >
              Collaborate and Create.
            </h1>
          </div>
        </div>
      </section>
      {/* Form Section... */}
      <section
        className={classNames({
          "relative mx-auto rounded-b-3xl": true,
          "flex flex-col justify-center items-center": true,
          "w-[95vw] md:w-[47.5%] h-[95vh]": true,
          "bg-sidebar dark:bg-[#1e1e1e] shadow dark:shadow-[0px_0px_5px_0px_#1f1f1f]":
            true,
        })}
      >
        <img
          className="invert absolute w-32 z-10 top-24 right-20 rounded-full dark:invert-0"
          src="/polka.png"
        />
        <form className="z-20" onSubmit={handleSubmit}>
          <h1 className="block md:hidden mb-2 pb-2 text-xl font-medium bound w-3/4 relative text-center text-primary border-b border-primary mx-auto">
            {"Sign Up"}
          </h1>
          {/* Email... */}
          <div className="flex items-center py-2 px-3 rounded-2xl mb-4 bg-white border-[1px] border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              required
              className="pl-2 outline-none border-none rounded-full w-full"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          {/* Password... */}
          <div className="flex items-center py-2 px-3 rounded-2xl mb-4 bg-white border-[1px] border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              ref={passwordRef}
              required
              className="pl-2 outline-none border-none rounded-full w-full cursor-text"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <img
              src={"/eye.svg"}
              width={14}
              height={16}
              className="opacity-40 cursor-pointer"
              onClick={togglePassword}
            />
          </div>
          {/* From Actions... */}
          {isLoading ? (
            <div className="w-full relative">
              <img className="h-6 mx-auto" src="https://i.gifer.com/VAyR.gif" />
            </div>
          ) : (
            <>
              <button
                type="submit"
                className={classNames({
                  "block w-full mt-4 py-2 rounded-xl mb-2": true,
                  "text-main font-bold bound": true,
                  "transition ease-in-out hover:scale-[1.025]": true,
                  "bg-primary hover:bg-hover": true,
                })}
              >
                Sign Up
              </button>
            </>
          )}
        </form>

        {/* Login... */}
        <div className="w-20 h-2 rounded-b-3xl border-primary border-[1px] mx-auto my-10" />
        {isLoading ? (
          <></>
        ) : (
          <div>
            <h1 className="font-bold mento text-xl text-primary">
              Already have an account?
            </h1>

            <Link href={"/login"}>
              <button
                className={classNames({
                  "block rounded-xl w-full hover:bg-hover": true,
                  "mt-4 py-2 mb-2": true,
                  "font-bold bound text-primary hover:text-hover": true,
                  "border-2 border-primary": true,
                  "hover:scale-[1.05] transition-all ease-in-out": true,
                })}
              >
                Log In
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Register;
