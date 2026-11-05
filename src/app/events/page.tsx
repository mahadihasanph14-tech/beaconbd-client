import { API_URL } from "@/lib/api";
import type { EventItem } from "@/types/event";
import { EventsFilter } from "@/components/EventsFilter";

async function getEvents(): Promise<EventItem[]> {
  const res = await fetch(`${API_URL}/events`, {
    cache: "no-store"
  });

  if (!res.ok) return [];

  return (await res.json()).data || [];
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <section className="section">
      <div className="container">

        <p className="font-bold text-[var(--primary)]">
          UPCOMING
        </p>

        <h1 className="mt-2 text-4xl font-black sm:text-5xl">
          Upcoming Events
        </h1>

        <p className="muted mt-3 max-w-2xl">
          Discover community service events happening soon and choose an action that feels meaningful to you.
        </p>

        <EventsFilter events={events} />

      </div>
    </section>
  );
}