"use client";

import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Wiser is a platform that helps you make better choices for the environment. We provide you with the information you need to make informed decisions about the products you buy. We also provide you with a list of alternatives to the products you already use. We are a community of people who care about the environment and want to make a difference. We are here to help you make better choices for the environment.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`}
        />
        <link
          rel="shortcut icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`}
        />
        <link
          rel="apple-touch-icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`}
        />
        <title>{"Brands | Ecowiser"}</title>
      </Head>
      {children}
    </>
  );
}
