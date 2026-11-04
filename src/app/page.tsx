import Link from "next/link";
import { ArrowRight, HeartHandshake, Leaf, Users, ShieldCheck } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { API_URL } from "@/lib/api";
import type { EventItem } from "@/types/event";

async function getEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${API_URL}/events?limit=6`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()).data || [];
  } catch {
    return [];
  }
}

const gallery = [
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=80"
];

export default async function Home() {
  const events = await getEvents();

  return (
    <>
      <section className="section">
        <div className="container grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="rounded-full bg-[var(--soft)] px-4 py-2 text-sm font-bold text-[var(--primary)]">Community starts with you</span>
            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">Small actions.<br /><span className="text-[var(--primary)]">Big changes.</span></h1>
            <p className="muted mt-6 max-w-xl text-lg">Create local service events, invite your community, and keep track of the impact you make together.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/events" className="btn btn-primary">Explore Events <ArrowRight size={17} /></Link>
              <Link href="/create-event" className="btn btn-soft">Create an Event</Link>
            </div>
          </div>
          <div className="relative">
            <img className="h-[460px] w-full rounded-[36px] object-cover" src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85" alt="Community volunteers" />
            <div className="card absolute -bottom-5 -left-4 p-5 shadow-xl">
              <div className="text-3xl font-black text-[var(--primary)]">1,000+</div>
              <div className="muted text-sm">community actions</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container grid gap-5 md:grid-cols-3">
          {[
            [HeartHandshake, "Serve together", "Find people who care about the same local causes."],
            [Leaf, "Create impact", "Organize cleanups, plantation drives and donation events."],
            [Users, "Build community", "Join events and make volunteering a shared habit."]
          ].map(([Icon, title, text]) => (
            <div className="card p-6" key={title as string}>
              <div className="grid size-12 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--primary)]"><Icon size={23} /></div>
              <h3 className="mt-5 text-xl font-extrabold">{title as string}</h3>
              <p className="muted mt-2">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div><p className="font-bold text-[var(--primary)]">UP NEXT</p><h2 className="mt-2 text-4xl font-black">Recent upcoming events</h2></div>
            <Link href="/events" className="hidden font-bold text-[var(--primary)] md:block">View all →</Link>
          </div>
          {events.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(e => <EventCard key={e._id} event={e} />)}</div> : <div className="card mt-8 p-12 text-center muted">No upcoming events yet. Be the first to create one.</div>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex items-end justify-between"><div><p className="font-bold text-[var(--primary)]">MOMENTS</p><h2 className="mt-2 text-4xl font-black">Community in action</h2></div></div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">{gallery.map((src, i) => <img key={src} src={src} alt={`Community service ${i + 1}`} className="h-72 w-full rounded-3xl object-cover" />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rounded-[32px] bg-[var(--primary)] p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_400px] md:items-center">
              <div><p className="font-bold opacity-80">STAY CONNECTED</p><h2 className="mt-2 text-4xl font-black">Get the next good thing in your inbox.</h2><p className="mt-3 opacity-80">Monthly event highlights and simple ways to help your community.</p></div>
              <div className="flex gap-2"><input className="input bg-white text-black" placeholder="Your email address" /><button className="btn bg-black text-white">Subscribe</button></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
