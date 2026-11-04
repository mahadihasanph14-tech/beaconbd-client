"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Name must be at least 2 characters.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Enter a valid email address.");
    if (!form.image.startsWith("http")) return toast.error("Enter a valid photo URL.");
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(form.password)) return toast.error("Password needs uppercase, lowercase and at least 6 characters.");
    setLoading(true);
    const result = await authClient.signUp.email(form);
    setLoading(false);
    if (result.error) return toast.error(result.error.message || "Registration failed.");
    toast.success("Account created successfully.");
    router.push("/");
    router.refresh();
  }

  return <section className="section"><div className="container"><form onSubmit={submit} className="card mx-auto max-w-md space-y-5 p-7">
    <div><p className="font-bold text-[var(--primary)]">JOIN THE COMMUNITY</p><h1 className="mt-2 text-4xl font-black">Create account</h1></div>
    {[
      ["name", "Name", "text"], ["email", "Email", "email"], ["image", "Photo URL", "url"], ["password", "Password", "password"]
    ].map(([key, label, type]) => <input key={key} className="input" type={type} placeholder={label} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} />)}
    <p className="text-xs muted">Password: at least 6 characters with one uppercase and one lowercase letter.</p>
    <button disabled={loading} className="btn btn-primary w-full">{loading ? "Creating..." : "Create account"}</button>
    <p className="text-center text-sm muted">Already registered? <Link className="font-bold text-[var(--primary)]" href="/login">Login</Link></p>
  </form></div></section>;
}
