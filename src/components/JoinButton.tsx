"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export function JoinButton({ eventId }: { eventId: string }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function join() {
    if (!session) return router.push(`/login?callbackUrl=/events/${eventId}`);
    setLoading(true);
    try {
      const token = (await authClient.token()).data?.token;
      if (!token) throw new Error("Authentication token unavailable.");
      await apiFetch(`/events/${eventId}/join`, { method: "POST" }, token);
      toast.success("You joined this event.");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not join event.");
    } finally { setLoading(false); }
  }

  return <button onClick={join} disabled={loading} className="btn btn-primary mt-8 w-full">{loading ? "Joining..." : "Join Event"}</button>;
}
