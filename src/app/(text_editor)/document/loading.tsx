"use client";

import { LoaderSkeleton } from "@/components";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <LoaderSkeleton />
    </div>
  );
}
