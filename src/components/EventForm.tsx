"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { EventItem, EventType } from "@/types/event";

const types: EventType[] = ["Cleanup", "Plantation", "Donation", "Education", "Health", "Other"];

export function EventForm({ event }: { event?: EventItem }) {
const router = useRouter();
const { data: session } = authClient.useSession();
const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
title: event?.title || "",
description: event?.description || "",
type: event?.type || "Donation",
image: event?.image || "",
location: event?.location || "",
date: event ? event.date.slice(0, 16) : ""
});

const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 16);

function update(key: string, value: string) {
setForm(prev => ({ ...prev, [key]: value }));
}

async function submit(e: React.FormEvent) {
e.preventDefault();

if (!session) return toast.error("Please log in first.");
if (form.title.trim().length < 5) return toast.error("Title must be at least 5 characters.");
if (form.description.trim().length < 20) return toast.error("Description must be at least 20 characters.");
if (!form.image.startsWith("http")) return toast.error("Enter a valid image URL.");
if (!form.location.trim()) return toast.error("Location is required.");
if (!form.date || new Date(form.date) <= new Date()) return toast.error("Event date must be in the future.");

setLoading(true);

try {
  const tokenResult = await authClient.token();
  const token = tokenResult.data?.token;

  if (!token) throw new Error("Could not create authentication token.");

  await apiFetch(event ? `/events/${event._id}` : "/events", {
    method: event ? "PATCH" : "POST",
    body: JSON.stringify({
      ...form,
      date: new Date(form.date).toISOString()
    })
  }, token);

  toast.success(event ? "Event updated successfully." : "Event created successfully.");

  router.push(event ? "/events/manage" : "/events");
  router.refresh();
} catch (err) {
  toast.error(err instanceof Error ? err.message : "Could not save event.");
} finally {
  setLoading(false);
}

}

return ( <form onSubmit={submit} className="event-form card mx-auto max-w-3xl space-y-5 p-6 md:p-8">


  <div>
    <label className="event-label mb-2 block">Event title</label>
    <input
      className="event-input"
      value={form.title}
      onChange={e => update("title", e.target.value)}
      placeholder="Winter clothes distribution"
    />
  </div>

  <div>
    <label className="event-label mb-2 block">Description</label>
    <textarea
      className="event-input min-h-32"
      value={form.description}
      onChange={e => update("description", e.target.value)}
      placeholder="Tell people what this event will accomplish..."
    />
  </div>

  <div className="grid gap-5 md:grid-cols-2">
    <div>
      <label className="event-label mb-2 block">Event type</label>
      <select
        className="event-input"
        value={form.type}
        onChange={e => update("type", e.target.value)}
      >
        {types.map(t => <option key={t}>{t}</option>)}
      </select>
    </div>

    <div>
      <label className="event-label mb-2 block">Event date</label>
      <input
        className="event-input"
        type="datetime-local"
        min={minDate}
        value={form.date}
        onChange={e => update("date", e.target.value)}
      />
    </div>
  </div>

  <div>
    <label className="event-label mb-2 block">Thumbnail image URL</label>
    <input
      className="event-input"
      value={form.image}
      onChange={e => update("image", e.target.value)}
      placeholder="https://..."
    />
  </div>

  <div>
    <label className="event-label mb-2 block">Location</label>
    <input
      className="event-input"
      value={form.location}
      onChange={e => update("location", e.target.value)}
      placeholder="Mirpur 10, Dhaka"
    />
  </div>

  <button disabled={loading} className="btn btn-primary w-full">
    {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
  </button>

</form>


);
}
