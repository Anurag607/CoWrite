"use client";
import React from "react";
import classNames from "classnames";
import DarkMode from "@/components/DarkMode";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import {
  ArrowLeftOutlined,
  CaretRightFilled,
  LoginOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const router = useRouter();
  const { authInstance } = useAppSelector((state: any) => state.auth);

  React.useEffect(() => {
    if (authInstance) {
      router.push(`/dashboard/${authInstance._id}`);
    }
  }, [authInstance]);

  return (
    <nav
      className={classNames({
        "bg-transparent z-[1000]": true, // colors
        "flex items-center justify-between mobile:px-4 px-10": true, // layout
        "bg-transparent w-full relative py-3 h-fit": true, //positioning & styling
      })}
    >
      <div className="w-fit h-fit flex justify-center items-center gap-4 relative">
        <div
          onClick={() => router.push("/")}
          className="w-fit h-fit flex justify-center items-center gap-2 relative cursor-pointer"
        >
          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="logo"
            className="dark:invert sm:w-[42px] sm:h-[42px] w-[32px] h-[32px] cursor-pointer"
          />
          <h3
            className={classNames({
              "bound font-bold text-xl sm:text-2xl text-primary": true,
              "flex justify-center items-center gap-4 cursor-pointer": true,
            })}
          >
            {"CoWrite"}
          </h3>
        </div>
      </div>
      <div className={`flex justify-center items-center gap-x-2`}>
        <Link href={"/login"}>
          <button
            className={classNames({
              "text-primary font-normal bound text-sm": true,
              "mobile-sm:hidden flex justify-center items-center gap-2 cursor-pointer":
                true,
              "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700":
                true,
              "px-2 py-1 mt-2 rounded-md": true,
            })}
          >
            {"Login"}
          </button>
        </Link>
        <DarkMode />
        <Link href={"/login"}>
          <button
            className={classNames({
              "text-primary font-normal bound text-[1.75rem]": true,
              "hidden mobile-sm:flex justify-center items-center gap-2 cursor-pointer":
                true,
              "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700":
                true,
              "px-2 py-1 rounded-md": true,
            })}
          >
            <LoginOutlined />
          </button>
        </Link>
      </div>
    </nav>
  );
};

const Home = () => {
  const heading = "Collaborate and Create Together";
  const subHeading = "Streamline Your Team's Writing Process.";

  return (
    <main
      className={
        "w-screen h-screen flex flex-col justify-start items-center relative"
      }
    >
      <Navbar />
      <div
        className={classNames({
          "w-full h-full flex flex-col items-center justify-center gap-y-6":
            true,
        })}
      >
        <div
          className={classNames({
            "flex flex-col items-center justify-center gap-y-6": true,
          })}
        >
          <div
            className={classNames({
              "mobile-sm:text-2xl text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center bound tracking-wide":
                true,
              "mobile-sm:w-[95vw] w-[35rem] sm:w-[40rem] md:w-[45rem] h-fit break-before-avoid":
                true,
            })}
          >
            {heading + ". Welcome to CoWrite."}
          </div>
          <div
            className={classNames({
              "mobile-sm:text-2xl text-3xl font-bold text-primary text-center mento tracking-tight":
                true,
              "mobile-sm:w-[95vw] w-[35rem] sm:w-[40rem] md:w-[45rem] h-fit break-before-avoid":
                true,
            })}
          >
            {subHeading}
          </div>
        </div>
        <Link href={"/login"}>
          <button
            className={classNames({
              "flex justify-center items-center gap-2": true,
              "mobile-sm:px-4 px-10 py-2 cursor-pointer": true,
              "text-main font-normal mobile-sm:text-sm text-lg bound hover:text-[#37474f] dark:hover:text-white":
                true,
              "border border-primary rounded-full": true,
              "bg-primary hover:bg-sidebar": true,
            })}
          >
            {"Get Started"}
            <CaretRightFilled />
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
