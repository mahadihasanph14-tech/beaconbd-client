"use client";

import { Protected } from "@/components/Protected";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { EventCard } from "@/components/EventCard";
import type { EventItem } from "@/types/event";
import { useEffect, useState } from "react";

export default function JoinedPage() {
  const { data: session } = authClient.useSession();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (!session) return;
    authClient.token().then(async ({ data }) => {
      if (data?.token) setEvents((await apiFetch<{ data: EventItem[] }>("/events/joined", {}, data.token)).data);
    });
  }, [session]);

  return <Protected><section className="section"><div className="container"><h1 className="text-5xl font-black">Joined Events</h1>{events.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(e => <EventCard key={e._id} event={e} />)}</div> : <div className="card mt-8 p-12 text-center muted">You have not joined an event yet.</div>}</div></section></Protected>;
}
