"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetchAuth } from "@/lib/api";

const initialForm = {
  title: "",
  description: "",
  type: "Cleanup",
  image: "",
  location: "",
  date: ""
};

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await apiFetchAuth("/events", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          date: new Date(form.date).toISOString()
        })
      });

      setMessage("Event created successfully!");
      setForm(initialForm);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Create New Event
        </h1>

        <p className="mb-8 text-gray-500">
          Share an event and bring people together.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Event Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              minLength={5}
              placeholder="Enter event title"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              minLength={20}
              rows={5}
              placeholder="Describe your event"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Event Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            >
              <option>Cleanup</option>
              <option>Plantation</option>
              <option>Donation</option>
              <option>Education</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Image URL</label>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Enter event location"
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Event Date & Time</label>
            <input
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              required
              min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
              className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
            />
          </div>

          {message && (
            <p className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
