"use client";
import { useState } from "react";
import { BookMarked, Trash2 } from "lucide-react";
import { COVERS, FONT_VAR } from "@/lib/constants";
import { bn } from "@/lib/bengali";

export default function BookCard({ diary, onOpen, onDelete }) {
  const c = COVERS[diary.cover] || COVERS.leather;
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ perspective: "1100px", animation: "ld-up .5s ease both" }}>
      <button onClick={() => onOpen(diary.id)} aria-label={`খুলুন: ${diary.name}`} style={{
        position: "relative", width: "100%", aspectRatio: "3/4", border: "none", cursor: "pointer", padding: 0, background: "transparent",
        transform: hover ? "rotateY(-16deg) translateY(-4px)" : "rotateY(-4deg)", transformStyle: "preserve-3d",
        transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
      }}>
        <div style={{ position: "absolute", inset: "3% -2px 3% auto", width: 10, borderRadius: "0 3px 3px 0",
          background: "repeating-linear-gradient(to right,#f3ead7 0 1px,#d9cba9 1px 2px)", transform: "translateX(6px)", boxShadow: "2px 2px 6px rgba(0,0,0,.2)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "5px 9px 9px 5px", background: c.bg, overflow: "hidden",
          boxShadow: hover ? "26px 22px 44px rgba(40,25,10,.4)" : "16px 14px 30px rgba(40,25,10,.32)", border: `1px solid ${c.border}55`, transition: "box-shadow .5s" }}>
          <div style={{ position: "absolute", inset: "0 auto 0 0", width: "16%", background: "linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,0))" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "16%", width: 2, background: "rgba(255,255,255,.10)" }} />
          <div style={{ position: "absolute", inset: "10% 9% 12% 22%", border: `1px solid ${c.accent}66`, borderRadius: 3 }} />
          <div style={{ position: "absolute", inset: "0 9% 0 22%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: "0 4px" }}>
            <BookMarked size={20} style={{ color: c.accent, opacity: .85 }} />
            <div style={{ fontFamily: FONT_VAR.book, fontWeight: 600, fontSize: "clamp(15px,4.4vw,21px)", color: c.accent, lineHeight: 1.35, textShadow: "0 1px 2px rgba(0,0,0,.25)" }}>{diary.name}</div>
            <div style={{ width: 34, height: 1, background: `${c.accent}88` }} />
            <div style={{ fontSize: 11, color: c.accent, opacity: .75, fontFamily: FONT_VAR.book }}>{bn(diary.pages.length)} পৃষ্ঠা</div>
          </div>
        </div>
      </button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, padding: "0 2px" }}>
        <span style={{ fontFamily: FONT_VAR.book, fontSize: 13.5, opacity: .9, fontWeight: 600 }}>{diary.name}</span>
        <button onClick={(e) => { e.stopPropagation(); onDelete(diary.id); }} aria-label="ডায়েরি মুছুন"
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", opacity: .5, padding: 4 }}>
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
