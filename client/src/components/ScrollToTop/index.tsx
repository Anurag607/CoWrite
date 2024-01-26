"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop({
  _children,
}: {
  _children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, [pathname, _children]);
  return _children;
}
