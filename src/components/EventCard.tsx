import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import type { EventItem } from "@/types/event";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card overflow-hidden">
      <img src={event.image} alt={event.title} className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--soft)] px-3 py-1 text-xs font-bold text-[var(--primary)]">{event.type}</span>
          <span className="text-sm muted">{event.participants || 0} joined</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-xl font-extrabold">{event.title}</h3>
        <div className="mt-4 space-y-2 text-sm muted">
          <p className="flex gap-2"><MapPin size={17} /> {event.location}</p>
          <p className="flex gap-2">
  <CalendarDays size={17} /> 
  {new Date(event.date).toLocaleString('en-US', { hour12: true })}
</p>

        </div>
        <Link href={`/events/${event._id}`} className="btn btn-primary mt-5 w-full">View Event</Link>
      </div>
    </article>
  );
}
