"use client";

import { useEffect, useState } from "react";

export default function useScrollTrigger({
  ref,
  threshold = 100,
}: {
  ref: any;
  threshold: number;
}) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const target = ref?.current || window;

    const listener = () => {
      if (target.scrollY > threshold) {
        setTrigger(true);
      } else {
        setTrigger(false);
      }
    };

    target.addEventListener("scroll", listener);

    return () => {
      target.removeEventListener("scroll", listener);
    };
  }, [ref, threshold]);

  return trigger;
}
