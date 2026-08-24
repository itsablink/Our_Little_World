"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function TabAuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/login") {
      setChecked(true);
      return;
    }

    const tabAuth = typeof window !== "undefined" ? window.sessionStorage.getItem("olw_tab_auth") : null;

    if (!tabAuth) {
      // Tab marker is missing (fresh tab opened directly or tab closed & reopened)
      fetch("/api/auth/logout", { method: "POST" }).finally(() => {
        router.replace("/login");
      });
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (pathname === "/login") {
    return children;
  }

  if (!checked) {
    return null; // Prevents exposing private content before per-tab authentication is verified
  }

  return children;
}
