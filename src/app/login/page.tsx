"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password are required.");
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password
      });

      if (result.error) {
        return toast.error(result.error.message || "Login failed.");
      }

      toast.success("Welcome back!");

      router.push(params.get("callbackUrl") || "/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch {
      toast.error("Google login failed. Please try again.");
    }
  }

  return (
    <section className="section">
      <div className="container">
        <form
          onSubmit={login}
          className="card mx-auto max-w-md space-y-5 p-7"
        >
          <div>
            <p className="font-bold text-[var(--primary)]">
              WELCOME BACK
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Log in
            </h1>

            <p className="muted mt-2">
              Continue making a difference.
            </p>
          </div>

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={google}
            className="btn btn-soft w-full"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm muted">
            No account?{" "}
            <Link
              className="font-bold text-[var(--primary)]"
              href="/register"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="section">
          <div className="container text-center">
            Loading login page...
          </div>
        </section>
      }
    >
      <LoginForm />
    </Suspense>
  );
}