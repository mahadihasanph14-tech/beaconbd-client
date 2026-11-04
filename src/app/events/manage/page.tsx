"use client";

import { Protected } from "@/components/Protected";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import type { EventItem } from "@/types/event";
import Link from "next/link";
import { toast } from "sonner";

export default function ManagePage() {
  const { data: session } = authClient.useSession();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (!session) return;
    authClient.token().then(async ({ data }) => {
      if (data?.token) {
        const result = await apiFetch<{ data: EventItem[] }>("/events/mine", {}, data.token);
        setEvents(result.data);
      }
    }).catch(() => toast.error("Could not load your events."));
  }, [session]);

  async function remove(id: string) {
    if (!confirm("Delete this event?")) return;
    const token = (await authClient.token()).data?.token;
    if (!token) return;
    try {
      await apiFetch(`/events/${id}`, { method: "DELETE" }, token);
      setEvents(events.filter(e => e._id !== id));
      toast.success("Event deleted.");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Delete failed."); }
  }

  return <Protected><section className="section"><div className="container"><h1 className="text-5xl font-black">Manage Events</h1><div className="mt-8 space-y-4">{events.map(e => <div className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between" key={e._id}><div><h3 className="text-xl font-bold">{e.title}</h3><p className="muted">{new Date(e.date).toLocaleString()} · {e.location}</p></div><div className="flex gap-2"><Link className="btn btn-soft" href={`/events/manage/${e._id}`}>Edit</Link><button onClick={() => remove(e._id)} className="btn bg-red-100 text-red-600">Delete</button></div></div>)}</div></div></section></Protected>;
}
