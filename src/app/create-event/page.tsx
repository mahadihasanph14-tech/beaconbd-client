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

  const inputClasses =
    "w-full rounded-lg border p-3 outline-none transition " +
    "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-600 " +
    "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-green-500";

  return (
    <main className="min-h-screen w-full px-4 py-12 flex flex-col items-center justify-start bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="w-full max-w-2xl flex flex-col items-start justify-start">
        
        <div className="mb-6 w-full text-left pl-1 sm:pl-0">
          <p className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-500">
            ORGANIZE
          </p>
          <h1 className="mt-1 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
            Create an Event
          </h1>
        </div>

        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium text-gray-800 dark:text-zinc-200">
                Event Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                minLength={5}
                placeholder="Enter event title"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-800 dark:text-zinc-200">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                minLength={20}
                rows={5}
                placeholder="Describe your event"
                className={inputClasses}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-gray-800 dark:text-zinc-200">
                  Event Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">Cleanup</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">Plantation</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">Donation</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">Education</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">Health</option>
                  <option className="bg-white text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-800 dark:text-zinc-200">
                  Event Date
                </label>
                <input
                  name="date"
                  type="datetime-local"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-800 dark:text-zinc-200">
                Thumbnail image URL
              </label>
              <input
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                required
                placeholder="https://..."
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-800 dark:text-zinc-200">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Enter event location"
                className={inputClasses}
              />
            </div>

            {message && (
              <p className="rounded-lg border border-gray-200 bg-gray-100 p-3 text-sm text-gray-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
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
      </div>
    </main>
  );
}
