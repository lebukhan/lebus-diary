"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseEnabled, auth } from "@/lib/firebase";
import {
  GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged,
} from "firebase/auth";

const AuthCtx = createContext(null);
const NEED = "Firebase কনফিগার করা নেই — .env.local এ মান বসান।";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled) { setLoading(false); return; }
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return () => unsub();
  }, []);

  const value = {
    user, loading, enabled: firebaseEnabled,
    async google() { if (!firebaseEnabled) throw new Error(NEED); await signInWithPopup(auth, new GoogleAuthProvider()); },
    async loginEmail(e, p) { if (!firebaseEnabled) throw new Error(NEED); await signInWithEmailAndPassword(auth, e, p); },
    async signupEmail(e, p) { if (!firebaseEnabled) throw new Error(NEED); await createUserWithEmailAndPassword(auth, e, p); },
    async logout() { if (firebaseEnabled) await signOut(auth); },
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) return { user: null, loading: false, enabled: false, google: async () => {}, loginEmail: async () => {}, signupEmail: async () => {}, logout: async () => {} };
  return c;
}
