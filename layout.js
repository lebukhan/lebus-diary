"use client";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { DiaryProvider } from "@/lib/store";

export default function Providers({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return (
    <AuthProvider>
      <DiaryProvider>{children}</DiaryProvider>
    </AuthProvider>
  );
}
