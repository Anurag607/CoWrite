"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import {
  ErrorBoundaryWrapper,
  LoaderSkeleton,
  Navbar,
  ScrollToTop,
  Sidebar,
} from "@/components";
import { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { CaretUpOutlined } from "@ant-design/icons";
import useScrollTrigger from "@/custom-hooks/useScrollTrigger";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const ScrollTop = ({ children }: { children: React.ReactNode }) => {
  const threshold = 150;
  const trigger = useScrollTrigger({ threshold });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed right-10 bottom-10 duration-200 ${
        trigger ? "opacity-100" : "opacity-0"
      }`}
    >
      <div onClick={handleClick}>{children}</div>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={`A Notion Like Block Editor.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.ico`}
        />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.ico`}
        />
        <link
          rel="apple-touch-icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.ico`}
        />
        <title>{"CoWrite"}</title>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ProgressBar
          height="4px"
          color="#1b1b1b"
          options={{ showSpinner: true }}
          shallowRouting
        />
        <ReduxProviders>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoaderSkeleton />}>
              <ErrorBoundaryWrapper>
                <ScrollToTop _children={null} />
                <div className="relative max-w-screen max-h-screen flex flex-row items-end justify-end bg-main gap-x-3">
                  <Sidebar />
                  <div
                    className={classNames({
                      [`relative h-screen w-[calc(100vw_-_0px)] flex flex-col items-center justify-between`]:
                        true,
                      "bg-main": true,
                      "mobile:w-screen": true,
                    })}
                  >
                    <Navbar />
                    {children}
                    <div className={"w-full h-[2rem] bg-transparent"} />
                  </div>
                </div>
              </ErrorBoundaryWrapper>
            </Suspense>
            <ScrollTop>
              <div className="w-10 aspect-square rounded-full bg-primary text-white grid place-items-center cursor-pointer shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <CaretUpOutlined />
              </div>
            </ScrollTop>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <ToastContainer autoClose={1000} hideProgressBar />
        </ReduxProviders>
      </body>
    </html>
  );
}
