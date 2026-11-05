import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  Users,
  ShieldCheck,
} from "lucide-react";
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
  {
    image: "https://images.unsplash.com/photo-1758599668429-121d54188b9c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Community Cleanup",
    description: "Volunteers working together to create a cleaner environment.",
  },
  {
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    title: "Tree Plantation",
    description: "Planting trees today for a greener and healthier tomorrow.",
  },
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    title: "Helping Children",
    description: "Supporting children through community care and kindness.",
  },
  {
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    title: "Community Support",
    description: "Bringing people together to make a positive difference.",
  },
  {
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    title: "Volunteer Together",
    description: "Small acts of kindness can create a big impact.",
  },
  {
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    title: "Donation Campaign",
    description: "Sharing resources and helping people in need.",
  },
];

export default async function Home() {
  const events = await getEvents();

  return (
    <>
      <section className="section">
        <div className="container grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="rounded-full bg-[var(--soft)] px-4 py-2 text-sm font-bold text-[var(--primary)]">
              Community starts with you
            </span>
            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
              Small actions.
              <br />
              <span className="text-[var(--primary)]">Big changes.</span>
            </h1>
            <p className="muted mt-6 max-w-xl text-lg">
              Create local service events, invite your community, and keep track
              of the impact you make together.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/events" className="btn btn-primary">
                Explore Events <ArrowRight size={17} />
              </Link>
              <Link href="/create-event" className="btn btn-soft">
                Create an Event
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              className="h-[460px] w-full rounded-[36px] object-cover"
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
              alt="Community volunteers"
            />
            <div className="card absolute -bottom-5 -left-4 p-5 shadow-xl">
              <div className="text-3xl font-black text-[var(--primary)]">
                1,000+
              </div>
              <div className="muted text-sm">community actions</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container">
          <div className="mb-8 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              WHY JOIN US?
            </p>
            <h2 className="mt-1 text-3xl font-black text-gray-500 dark:text-zinc-400 sm:text-4xl">
              Our Core Initiatives
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                HeartHandshake,
                "Serve together",
                "Find people who care about the same local causes.",
              ],
              [
                Leaf,
                "Create impact",
                "Organize cleanups, plantation drives and donation events.",
              ],
              [
                Users,
                "Build community",
                "Join events and make volunteering a shared habit.",
              ],
            ].map(([Icon, title, text]) => (
              <div
                className="card p-6 border border-gray-100 bg-white text-gray-900 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 hover:border-[var(--primary)] dark:hover:border-[var(--primary)]"
                key={title as string}
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--primary)]">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-gray-500 dark:text-zinc-400">
                  {title as string}
                </h3>
                <p className="mt-2 text-gray-400 dark:text-zinc-500 text-sm font-medium">
                  {text as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-[var(--primary)]">UP NEXT</p>
              <h2 className="mt-2 text-4xl font-black">
                Recent upcoming events
              </h2>
            </div>
            <Link
              href="/events"
              className="hidden font-bold text-[var(--primary)] md:block"
            >
              View all →
            </Link>
          </div>
          {events.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e._id} event={e} />
              ))}
            </div>
          ) : (
            <div className="card mt-8 p-12 text-center muted">
              No upcoming events yet. Be the first to create one.
            </div>
          )}
        </div>
      </section>

      <section className="section">
  <div className="container">

    <div>
      <p className="font-bold text-[var(--primary)]">MOMENTS</p>
      <h2 className="mt-2 text-3xl font-black sm:text-4xl">
        Community in action
      </h2>
      <p className="muted mt-3">
        Together, we can make a meaningful difference.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {gallery.map((item, i) => (
        <article
          key={i}
          className="card overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-64 w-full object-cover"
          />

          <div className="p-5">
            <h3 className="text-xl font-bold">
              {item.title}
            </h3>

            <p className="muted mt-2 text-sm leading-6">
              {item.description}
            </p>
          </div>
        </article>
      ))}

    </div>
  </div>
</section>

      <section className="section">
        <div className="container">
          <div className="rounded-[32px] bg-[var(--primary)] dark:bg-emerald-950 p-8 text-white md:p-12 transition-colors duration-300">
            <div className="grid gap-8 md:grid-cols-[1fr_400px] md:items-center">
              <div>
                <p className="font-bold opacity-80 uppercase tracking-wider">
                  STAY CONNECTED
                </p>
                <h2 className="mt-2 text-4xl font-black">
                  Get the next good thing in your inbox.
                </h2>
                <p className="mt-3 opacity-80">
                  Monthly event highlights and simple ways to help your
                  community.
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  className="input bg-white text-black dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 w-full"
                  placeholder="Your email address"
                />

                <button className="btn rounded-full px-6 font-bold bg-white text-[var(--primary)] dark:bg-[var(--primary)] dark:text-white hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all duration-200 shadow-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
