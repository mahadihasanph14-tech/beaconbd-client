"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return toast.error("Email and password are required.");
    setLoading(true);
    const result = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (result.error) return toast.error(result.error.message || "Login failed.");
    toast.success("Welcome back!");
    router.push(params.get("callbackUrl") || "/");
    router.refresh();
  }

  async function google() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  }

  return <section className="section"><div className="container"><form onSubmit={login} className="card mx-auto max-w-md space-y-5 p-7">
    <div><p className="font-bold text-[var(--primary)]">WELCOME BACK</p><h1 className="mt-2 text-4xl font-black">Log in</h1><p className="muted mt-2">Continue making a difference.</p></div>
    <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
    <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    <button disabled={loading} className="btn btn-primary w-full">{loading ? "Logging in..." : "Login"}</button>
    <button type="button" onClick={google} className="btn btn-soft w-full">Continue with Google</button>
    <p className="text-center text-sm muted">No account? <Link className="font-bold text-[var(--primary)]" href="/register">Create one</Link></p>
  </form></div></section>;
}
