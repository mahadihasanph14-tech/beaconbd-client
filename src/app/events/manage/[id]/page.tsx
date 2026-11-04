"use client";

import { Protected } from "@/components/Protected";
import { EventForm } from "@/components/EventForm";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import type { EventItem } from "@/types/event";

export default function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => { params.then(p => setId(p.id)); }, [params]);
  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/events/${id}`).then(r => r.json()).then(d => setEvent(d.data));
  }, [id]);

  return <Protected><section className="section"><div className="container"><h1 className="mb-8 text-5xl font-black">Update Event</h1>{event && <EventForm event={event} />}</div></section></Protected>;
}
