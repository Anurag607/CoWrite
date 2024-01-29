"use client";

import { useRouter } from "next-nprogress-bar";
import React from "react";

const Page = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.back();
  }, []);

  return (
    <main
      className={
        "w-full h-full flex flex-col justify-center items-center relative"
      }
    >
      <div className={"text-3xl font-bold"}>{"DashboardPage"}</div>
    </main>
  );
};

export default Page;
