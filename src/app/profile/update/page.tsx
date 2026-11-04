"use client";

import { Protected } from "@/components/Protected";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

export default function UpdateProfile() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await authClient.updateUser({ name: name || session?.user.name, image: image || session?.user.image });
    setLoading(false);
    if (result.error) return toast.error(result.error.message || "Update failed.");
    toast.success("Profile updated.");
  }

  return <Protected><section className="section"><div className="container"><form onSubmit={save} className="card mx-auto max-w-xl space-y-5 p-7"><h1 className="text-4xl font-black">Update Profile</h1><input className="input" placeholder={session?.user.name || "Name"} value={name} onChange={e => setName(e.target.value)} /><input className="input" placeholder={session?.user.image || "Photo URL"} value={image} onChange={e => setImage(e.target.value)} /><button disabled={loading} className="btn btn-primary w-full">{loading ? "Saving..." : "Save changes"}</button></form></div></section></Protected>;
}
