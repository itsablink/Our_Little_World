"use client";

import { useRouter } from "next/navigation";

export default function LogoutLink() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="fixed top-5 right-5 z-20 text-xs uppercase tracking-widest text-wine/60 glass px-3 py-2 rounded-full hover:text-wine transition-colors"
    >
      Log out
    </button>
  );
}
