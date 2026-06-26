"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowLeft, BookMarked } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { FONT_VAR } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const { enabled, user, google, loginEmail, signupEmail } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(fn) {
    setErr(""); setBusy(true);
    try { await fn(); router.push("/"); }
    catch (e) { setErr(e?.message || "কিছু একটা ভুল হয়েছে"); }
    finally { setBusy(false); }
  }

  const field = { width: "100%", padding: "13px 15px 13px 42px", borderRadius: 10, border: "1px solid color-mix(in srgb, var(--sub) 35%, transparent)",
    background: "var(--paper)", color: "var(--ink)", fontSize: 15.5, outline: "none", fontFamily: FONT_VAR.modern };
  const iconWrap = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--sub)" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: 420, margin: "0 auto", padding: "20px 20px 50px" }}>
      <button onClick={() => router.push("/")} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", alignSelf: "flex-start", padding: 4 }}><ArrowLeft size={22} /></button>

      <div style={{ textAlign: "center", margin: "26px 0 30px" }}>
        <div style={{ width: 64, height: 64, margin: "0 auto 14px", borderRadius: 16, background: "linear-gradient(135deg,#5a2f1a,#7a4322)", display: "grid", placeItems: "center" }}>
          <BookMarked size={30} style={{ color: "#e7c884" }} />
        </div>
        <div style={{ fontFamily: FONT_VAR.book, fontSize: 24, fontWeight: 700 }}>ক্লাউড ব্যাকআপ</div>
        <div style={{ color: "var(--sub)", fontSize: 13.5, marginTop: 6 }}>লগইন করলে সব ডায়েরি নিরাপদে সিংক থাকবে।</div>
      </div>

      {user && <div style={{ textAlign: "center", color: "var(--sub)" }}>আপনি লগইন করা আছেন। <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "#9a6a3a", cursor: "pointer", textDecoration: "underline" }}>হোমে যান</button></div>}

      {!user && !enabled && (
        <div style={{ background: "var(--panel)", borderRadius: 12, padding: 18, color: "var(--sub)", lineHeight: 1.7, fontSize: 13.5 }}>
          ক্লাউড সিংক চালু করতে Firebase কনফিগার করতে হবে। <code style={{ color: "var(--ink)" }}>.env.local</code> ফাইলে আপনার Firebase প্রোজেক্টের মান বসিয়ে অ্যাপ রিস্টার্ট করুন। ততক্ষণ সব লেখা অফলাইনে এই ডিভাইসেই নিরাপদ।
        </div>
      )}

      {!user && enabled && (
        <>
          <button disabled={busy} onClick={() => run(google)} style={{ width: "100%", padding: 13, borderRadius: 10, cursor: "pointer",
            background: "#fff", color: "#2a2a2a", border: "1px solid #ddd", fontSize: 15, fontWeight: 600, display: "flex", justifyContent: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ fontWeight: 700, color: "#4285F4" }}>G</span> Google দিয়ে চালিয়ে যান
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--sub)", fontSize: 12, margin: "4px 0 18px" }}>
            <div style={{ flex: 1, height: 1, background: "color-mix(in srgb, var(--sub) 30%, transparent)" }} /> অথবা ইমেইল <div style={{ flex: 1, height: 1, background: "color-mix(in srgb, var(--sub) 30%, transparent)" }} />
          </div>

          <div style={{ position: "relative", marginBottom: 12 }}>
            <span style={iconWrap}><Mail size={17} /></span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ইমেইল" style={field} />
          </div>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={iconWrap}><Lock size={17} /></span>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="পাসওয়ার্ড" style={field} />
          </div>
          {err && <div style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>{err}</div>}

          <button disabled={busy} onClick={() => run(() => (mode === "login" ? loginEmail(email, pass) : signupEmail(email, pass)))}
            style={{ width: "100%", padding: 14, borderRadius: 11, cursor: "pointer", background: "linear-gradient(135deg,#5a2f1a,#7a4322)", color: "#f0dcb4", border: "none", fontFamily: FONT_VAR.book, fontWeight: 600, fontSize: 16 }}>
            {busy ? "অপেক্ষা করুন…" : mode === "login" ? "লগইন" : "নতুন অ্যাকাউন্ট"}
          </button>

          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ width: "100%", marginTop: 14, background: "none", border: "none", color: "var(--sub)", cursor: "pointer", fontSize: 13.5 }}>
            {mode === "login" ? "অ্যাকাউন্ট নেই? নতুন তৈরি করুন" : "আগের অ্যাকাউন্টে লগইন করুন"}
          </button>
        </>
      )}
    </div>
  );
}
