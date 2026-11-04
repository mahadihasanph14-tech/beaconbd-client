"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
const router = useRouter();

const [form, setForm] = useState({
name: "",
email: "",
image: "",
password: ""
});

const [loading, setLoading] = useState(false);

async function submit(e: React.FormEvent) {
e.preventDefault();


if (form.name.trim().length < 2) {
  return toast.error("Name must be at least 2 characters.");
}

if (!/^\S+@\S+\.\S+$/.test(form.email)) {
  return toast.error("Enter a valid email address.");
}

if (!form.image.startsWith("http")) {
  return toast.error("Enter a valid photo URL.");
}

if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(form.password)) {
  return toast.error("Password needs uppercase, lowercase and at least 6 characters.");
}

setLoading(true);

try {
  const result = await authClient.signUp.email({
    name: form.name.trim(),
    email: form.email.trim(),
    image: form.image.trim(),
    password: form.password
  });

  if (result.error) {
    return toast.error(result.error.message || "Registration failed.");
  }

  toast.success("Account created successfully.");

  router.push("/");
  router.refresh();
} catch {
  toast.error("Registration failed. Please try again.");
} finally {
  setLoading(false);
}


}

return ( <section className="section"> <div className="container"> <form
       onSubmit={submit}
       className="card mx-auto max-w-md space-y-5 p-7"
     > <div> <p className="font-bold text-[var(--primary)]">
JOIN THE COMMUNITY </p> <h1 className="mt-2 text-4xl font-black">
Create account </h1> </div>


      <input
        className="input"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <div>
        <input
          className="input"
          type="url"
          placeholder="Profile Photo URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <p className="mt-2 text-xs muted">
          Add a direct image URL for your profile picture.
        </p>
      </div>

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <p className="text-xs muted">
        Password: at least 6 characters with one uppercase and one lowercase letter.
      </p>

      <button
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Creating..." : "Create account"}
      </button>

      <p className="text-center text-sm muted">
        Already registered?{" "}
        <Link
          className="font-bold text-[var(--primary)]"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</section>

);
}
