import { Protected } from "@/components/Protected";
import { EventForm } from "@/components/EventForm";

export default function CreateEventPage() {
  return <Protected><section className="section"><div className="container"><p className="font-bold text-[var(--primary)]">ORGANIZE</p><h1 className="mb-8 mt-2 text-5xl font-black">Create an Event</h1><EventForm /></div></section></Protected>;
}
