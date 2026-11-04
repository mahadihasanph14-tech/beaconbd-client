import Link from "next/link";
import { API_URL } from "@/lib/api";
import { JoinButton } from "@/components/JoinButton";

async function getEvent(id: string) {
  const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()).data;
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) return <div className="container py-24 text-center"><h1 className="text-4xl font-black">Event not found</h1><Link href="/events" className="btn btn-primary mt-5">Back to events</Link></div>;

  return (
    <section className="section">
      <div className="container grid gap-8 md:grid-cols-[1.1fr_.9fr]">
        <img src={event.image} alt={event.title} className="h-[520px] w-full rounded-[32px] object-cover" />
        <div className="card p-7 md:p-9">
          <span className="rounded-full bg-[var(--soft)] px-3 py-1 text-xs font-bold text-[var(--primary)]">{event.type}</span>
          <h1 className="mt-5 text-4xl font-black">{event.title}</h1>
          <p className="muted mt-5 leading-7">{event.description}</p>
          <div className="mt-7 space-y-3 text-sm">
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p><strong>Organizer:</strong> {event.creatorName || event.creatorEmail}</p>
            <p><strong>Participants:</strong> {event.participants || 0}</p>
          </div>
          <JoinButton eventId={event._id} />
        </div>
      </div>
    </section>
  );
}
