import { API_URL } from "@/lib/api";
import type { EventItem } from "@/types/event";
import { EventCard } from "@/components/EventCard";

async function getEvents(): Promise<EventItem[]> {
  const res = await fetch(`${API_URL}/events`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()).data || [];
}

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <section className="section">
      <div className="container">
        <p className="font-bold text-[var(--primary)]">UPCOMING</p>
        <h1 className="mt-2 text-5xl font-black">Upcoming Events</h1>
        <p className="muted mt-3 max-w-2xl">Discover community service events happening soon and choose an action that feels meaningful to you.</p>
        {events.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(e => <EventCard key={e._id} event={e} />)}</div> : <div className="card mt-10 p-12 text-center">No upcoming events found.</div>}
      </div>
    </section>
  );
}
