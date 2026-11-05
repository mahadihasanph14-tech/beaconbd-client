"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import type { EventItem } from "@/types/event";

const categories = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Other"
];

export function EventsFilter({ events }: { events: EventItem[] }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter(event => {
    const matchesCategory =
      category === "All" || event.type === category;

    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.description.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
        
    
        <div className="flex flex-wrap gap-2">
          {categories.map(item => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                category === item
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

       
        <div className="relative w-full md:w-72 lg:w-80">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events or areas..."
            className="w-full py-2 pl-10 pr-4 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

      </div>

    
      {filteredEvents.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="card mt-8 p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            No events found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try another search or select a different category.
          </p>
        </div>
      )}
    </>
  );
}
