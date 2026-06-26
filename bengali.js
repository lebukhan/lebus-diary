"use client";
import { useRouter } from "next/navigation";
import { Sun, Moon, Coffee, LogOut } from "lucide-react";
import { useDiary } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { FONT_VAR, FONT_LABEL, SIZE_LABEL, SIZES, THEMES } from "@/lib/constants";
import { TopBar, Section, Choice } from "@/components/ui";

export default function SettingsPage() {
  const router = useRouter();
  const { settings, updateSettings } = useDiary();
  const { user, enabled, logout } = useAuth();
  const preview = "একটি সুন্দর বাংলা ডায়েরির পাতায় আজকের কথা লিখছি।";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "22px 18px 60px", animation: "ld-fade .4s both" }}>
      <TopBar onBack={() => router.push("/")} title="সেটিংস" />

      <Section title="লেখার স্টাইল">
        <Choice options={FONT_LABEL} value={settings.style} onSelect={(v) => updateSettings({ style: v })} />
        <div style={{ marginTop: 14, background: "var(--paper)", borderRadius: 10, padding: "16px 18px",
          border: "1px solid color-mix(in srgb, var(--sub) 26%, transparent)", fontFamily: FONT_VAR[settings.style], fontSize: SIZES[settings.size], lineHeight: 1.9 }}>
          {preview}
        </div>
      </Section>

      <Section title="ফন্ট সাইজ">
        <Choice options={SIZE_LABEL} value={settings.size} onSelect={(v) => updateSettings({ size: v })} />
      </Section>

      <Section title="থিম">
        <div style={{ display: "flex", gap: 12 }}>
          {[["light", "দিন", Sun], ["sepia", "সেপিয়া", Coffee], ["dark", "রাত", Moon]].map(([k, lbl, Icon]) => (
            <button key={k} onClick={() => updateSettings({ theme: k })} style={{ flex: 1, cursor: "pointer", padding: "14px 0", borderRadius: 11,
              background: THEMES[k].paper, color: THEMES[k].ink, border: `2px solid ${settings.theme === k ? "#9a6a3a" : "transparent"}`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 7, fontFamily: FONT_VAR.book, fontSize: 13.5 }}>
              <Icon size={18} /> {lbl}
            </button>
          ))}
        </div>
      </Section>

      <Section title="ব্যাকআপ ও অ্যাকাউন্ট">
        <div style={{ background: "var(--paper)", borderRadius: 11, padding: "14px 16px",
          border: "1px solid color-mix(in srgb, var(--sub) 22%, transparent)", fontSize: 13.5, color: "var(--sub)", lineHeight: 1.7 }}>
          {!enabled && <span>Firebase কনফিগার করা নেই — সব লেখা <b style={{ color: "var(--ink)" }}>এই ডিভাইসেই</b> অফলাইনে সংরক্ষিত।</span>}
          {enabled && !user && <span>লগইন করলে সব ডায়েরি <b style={{ color: "var(--ink)" }}>ক্লাউডে ব্যাকআপ</b> ও অন্য ডিভাইসে সিংক হবে।</span>}
          {enabled && user && <span>সিংক চালু — <b style={{ color: "var(--ink)" }}>{user.email || "লগইন করা"}</b></span>}
        </div>
        {enabled && !user && (
          <button onClick={() => router.push("/login")} style={{ marginTop: 12, width: "100%", padding: 13, borderRadius: 11, cursor: "pointer",
            background: "linear-gradient(135deg,#5a2f1a,#7a4322)", color: "#f0dcb4", border: "none", fontFamily: FONT_VAR.book, fontWeight: 600, fontSize: 15 }}>
            লগইন / ক্লাউড সিংক
          </button>
        )}
        {enabled && user && (
          <button onClick={logout} style={{ marginTop: 12, width: "100%", padding: 13, borderRadius: 11, cursor: "pointer", display: "flex", justifyContent: "center", gap: 8,
            background: "var(--panel)", color: "var(--ink)", border: "1px solid color-mix(in srgb, var(--sub) 30%, transparent)", fontFamily: FONT_VAR.book, fontWeight: 600, fontSize: 15 }}>
            <LogOut size={18} /> লগআউট
          </button>
        )}
      </Section>

      <div style={{ textAlign: "center", marginTop: 30, color: "var(--sub)", fontSize: 12, fontFamily: FONT_VAR.book }}>
        লেবুর ডায়েরি · সংস্করণ ০.১ · অফলাইন-ফার্স্ট PWA
      </div>
    </div>
  );
}
