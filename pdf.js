"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDiary } from "@/lib/store";
import { FONT_VAR } from "@/lib/constants";
import { bn, bnDate } from "@/lib/bengali";
import { TopBar } from "@/components/ui";

export default function SearchPage() {
  const router = useRouter();
  const { diaries } = useDiary();
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const results = [];
  if (query) {
    diaries.forEach((dy) => {
      dy.pages.forEach((p, idx) => {
        const dt = new Date(p.ts);
        const hay = `${dy.name} ${p.text} ${bnDate(dt)}`.toLowerCase();
        if (hay.includes(query)) {
          const pos = (p.text || "").toLowerCase().indexOf(query);
          const snip = pos >= 0 ? p.text.slice(Math.max(0, pos - 18), pos + 50) : (p.text || "").slice(0, 60);
          results.push({ id: dy.id, idx, name: dy.name, n: p.n, snip, dt });
        }
      });
    });
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "22px 18px 60px", animation: "ld-fade .4s both" }}>
      <TopBar onBack={() => router.push("/")} title="খুঁজুন" />
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--paper)", borderRadius: 11, padding: "12px 15px",
        border: "1px solid color-mix(in srgb, var(--sub) 33%, transparent)" }}>
        <Search size={18} style={{ color: "var(--sub)" }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="নাম, লেখা বা তারিখ লিখুন…"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: "var(--ink)", fontSize: 16, fontFamily: FONT_VAR.book }} />
      </div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {query && results.length === 0 && <div style={{ color: "var(--sub)", textAlign: "center", marginTop: 30, fontFamily: FONT_VAR.book }}>কিছু পাওয়া যায়নি।</div>}
        {results.map((r, i) => (
          <button key={i} onClick={() => router.push(`/diary/${r.id}`)} style={{ textAlign: "left", cursor: "pointer", background: "var(--panel)",
            border: "1px solid color-mix(in srgb, var(--sub) 18%, transparent)", borderRadius: 11, padding: "13px 15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--sub)", fontSize: 12, fontFamily: FONT_VAR.book }}>
              <span>{r.name} · পৃষ্ঠা {bn(r.n)}</span><span>{bnDate(r.dt)}</span>
            </div>
            <div style={{ fontFamily: FONT_VAR.book, fontSize: 14.5, marginTop: 5 }}>…{r.snip || "(খালি পাতা)"}…</div>
          </button>
        ))}
      </div>
    </div>
  );
}
