"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Settings as SettingsIcon, Cloud, CloudOff } from "lucide-react";
import { useDiary } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import BookCard from "@/components/BookCard";
import Splash from "@/components/Splash";
import { FONT_VAR } from "@/lib/constants";
import { bnDate, bnDay } from "@/lib/bengali";
import { styles } from "@/components/ui";

export default function HomePage() {
  const router = useRouter();
  const { diaries, ready, deleteDiary, syncing } = useDiary();
  const { user, enabled } = useAuth();
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("splashSeen")) { setSplash(false); return; }
    const t = setTimeout(() => { setSplash(false); sessionStorage.setItem("splashSeen", "1"); }, 2200);
    return () => clearTimeout(t);
  }, []);

  function onDelete(id) {
    if (window.confirm("এই ডায়েরিটি মুছে ফেলবেন? এটি ফেরানো যাবে না।")) deleteDiary(id);
  }

  if (splash || !ready) return <Splash />;
  const now = new Date();

  return (
    <div className="scroll" style={{ maxWidth: 940, margin: "0 auto", padding: "26px 18px 60px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: FONT_VAR.book, fontSize: 27, fontWeight: 700 }}>আমার ডায়েরি</div>
          <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 2 }}>আজ {bnDate(now)}, {bnDay(now)}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => router.push("/login")} style={styles.iconBtn} aria-label="অ্যাকাউন্ট" title={user ? "সিংক চালু" : "লগইন / ক্লাউড"}>
            {enabled && user ? <Cloud size={18} style={{ animation: syncing ? "ld-pulse 1.2s infinite" : "none" }} /> : <CloudOff size={18} />}
          </button>
          <button onClick={() => router.push("/search")} style={styles.iconBtn} aria-label="খুঁজুন"><Search size={19} /></button>
          <button onClick={() => router.push("/settings")} style={styles.iconBtn} aria-label="সেটিংস"><SettingsIcon size={19} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "26px 22px" }}>
        <button onClick={() => router.push("/create")} style={{ aspectRatio: "3/4", borderRadius: 9, cursor: "pointer", background: "transparent",
          border: "2px dashed color-mix(in srgb, var(--sub) 55%, transparent)", color: "var(--sub)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12, fontFamily: FONT_VAR.book, fontSize: 14.5 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", border: "2px solid color-mix(in srgb, var(--sub) 55%, transparent)", display: "grid", placeItems: "center" }}>
            <Plus size={24} />
          </div>
          নতুন ডায়েরি
        </button>
        {diaries.map((d) => <BookCard key={d.id} diary={d} onOpen={(id) => router.push(`/diary/${id}`)} onDelete={onDelete} />)}
      </div>
    </div>
  );
}
