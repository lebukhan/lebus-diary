"use client";
import { BookMarked } from "lucide-react";
import { FONT_VAR } from "@/lib/constants";

export default function Splash() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "linear-gradient(160deg,#2a1a0e,#4a2c16 55%,#23150a)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 92, height: 116, margin: "0 auto 26px", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "4px 8px 8px 4px", background: "#f5ecd8", boxShadow: "0 10px 30px rgba(0,0,0,.4)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "4px 8px 8px 4px", background: "linear-gradient(135deg,#5a2f1a,#7a4322)",
            transformOrigin: "left center", animation: "ld-cover 1.6s .5s cubic-bezier(.4,.1,.2,1) forwards", border: "1px solid rgba(199,156,76,.35)" }}>
            <BookMarked size={26} style={{ color: "#e7c884", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          </div>
        </div>
        <div style={{ fontFamily: FONT_VAR.book, fontSize: 30, fontWeight: 600, color: "#f0dcb4", animation: "ld-fade 1s 1s both" }}>লেবুর ডায়েরি</div>
        <div style={{ fontFamily: FONT_VAR.book, fontSize: 14, color: "#c9a877", marginTop: 8, animation: "ld-fade 1s 1.3s both" }}>আপনার নিজের একান্ত পাতা</div>
        <div style={{ marginTop: 26, fontSize: 11, color: "#a98a5e", letterSpacing: 2, animation: "ld-pulse 1.5s 1.6s infinite" }}>খুলছে…</div>
      </div>
    </div>
  );
}
