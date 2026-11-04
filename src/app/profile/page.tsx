"use client";

import { Protected } from "@/components/Protected";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  return <Protected><section className="section"><div className="container"><div className="card mx-auto max-w-xl p-8 text-center"><img className="mx-auto size-28 rounded-full object-cover" src={session?.user.image || "https://i.pravatar.cc/160"} alt={session?.user.name || "Profile"} /><h1 className="mt-5 text-3xl font-black">{session?.user.name}</h1><p className="muted mt-2">{session?.user.email}</p><Link href="/profile/update" className="btn btn-primary mt-6">Update Profile</Link></div></div></section></Protected>;
}
