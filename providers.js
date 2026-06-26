"use client";
import { ArrowLeft, Check } from "lucide-react";
import { FONT_VAR } from "@/lib/constants";

export const styles = {
  btnBare: { background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", display: "grid", placeItems: "center", padding: 4 },
  toolBtn: { width: 42, height: 42, borderRadius: 11, cursor: "pointer", background: "var(--panel)", border: "1px solid color-mix(in srgb, var(--sub) 22%, transparent)", color: "var(--ink)", display: "grid", placeItems: "center" },
  iconBtn: { width: 40, height: 40, borderRadius: "50%", cursor: "pointer", background: "var(--panel)", border: "1px solid color-mix(in srgb, var(--sub) 22%, transparent)", color: "var(--ink)", display: "grid", placeItems: "center" },
};
export const brownBtn = { background: "linear-gradient(135deg,#5a2f1a,#7a4322)", color: "#f0dcb4", border: "none", cursor: "pointer", fontFamily: FONT_VAR.book, fontWeight: 600 };

export function TopBar({ onBack, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <button onClick={onBack} style={styles.btnBare} aria-label="পিছনে"><ArrowLeft size={21} /></button>
      <div style={{ fontFamily: FONT_VAR.book, fontSize: 21, fontWeight: 600 }}>{title}</div>
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ fontSize: 12.5, color: "var(--sub)", fontWeight: 700, letterSpacing: .5, marginBottom: 12, textTransform: "uppercase" }}>{title}</div>
      {children}
    </div>
  );
}

export function Choice({ options, value, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {Object.entries(options).map(([k, lbl]) => {
        const on = value === k;
        return (
          <button key={k} onClick={() => onSelect(k)} style={{
            flex: 1, cursor: "pointer", padding: "12px 0", borderRadius: 10, fontFamily: FONT_VAR.book, fontSize: 14.5,
            background: on ? "linear-gradient(135deg,#5a2f1a,#7a4322)" : "var(--paper)",
            color: on ? "#f0dcb4" : "var(--ink)", border: on ? "1px solid transparent" : "1px solid color-mix(in srgb, var(--sub) 33%, transparent)",
          }}>{lbl}</button>
        );
      })}
    </div>
  );
}

export function MenuItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
      background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", fontSize: 14, fontFamily: FONT_VAR.book, borderRadius: 8, textAlign: "left" }}>
      {icon}{label}
    </button>
  );
}

export { Check };
