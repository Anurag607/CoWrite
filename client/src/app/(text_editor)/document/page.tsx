"use client";

import { AccessDropdown } from "@/components";
import { useRouter } from "next-nprogress-bar";
import React from "react";

const Page = () => {
  const router = useRouter();

  React.useEffect(() => {
    // router.back();
  }, []);

  return (
    <main
      className={
        "w-full h-full flex flex-col justify-start items-center relative gap-6"
      }
    >
      <div className={"text-primary text-3xl font-bold"}>{"DocumentPage"}</div>
      <AccessDropdown />
    </main>
  );
};

export default Page;
