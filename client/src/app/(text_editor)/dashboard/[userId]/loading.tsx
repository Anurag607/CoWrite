"use client";

import { LoaderSkeleton, LoadingSpinner } from "@/components";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <LoadingSpinner />
    </div>
  );
}
