"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, UserCircle } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    setMenuOpen(false);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-2 py-2">

        <Link href="/">
          <img
            src="/logo.jpg"
            alt="BeaconBD"
            className="h-12 w-auto rounded-xl border-2 border-green-700 object-contain sm:h-14"
          />
        </Link>

        <nav className="flex flex-1 justify-center">
          <Link
            className="btn btn-soft whitespace-nowrap px-2 text-xs sm:px-4 sm:text-sm"
            href="/events"
          >
            Upcoming Events
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

          <ThemeToggle />

          {!isPending && (
            session?.user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="btn btn-soft flex items-center gap-1 px-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
                    aria-expanded={menuOpen}
                  >
                    <UserCircle size={18} />
                    <span>Profile</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-xl">

                      <div className="border-b border-[var(--border)] px-3 py-2">
                        <p className="font-bold">
                          {session.user.name}
                        </p>
                        <p className="truncate text-xs muted">
                          {session.user.email}
                        </p>
                      </div>

                      <Link
                        href="/events/create"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--soft)]"
                      >
                        Create Event
                      </Link>

                      <Link
                        href="/events/joined"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--soft)]"
                      >
                        Joined Events
                      </Link>

                      <Link
                        href="/events/manage"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--soft)]"
                      >
                        Manage Events
                      </Link>

                      <div className="my-1 border-t border-[var(--border)]" />

                      <button
                        onClick={handleLogout}
                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-500/10"
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-primary px-2 text-xs sm:px-4 sm:text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary px-2 text-xs sm:px-4 sm:text-sm"
              >
                Login
              </Link>
            )
          )}

        </div>
      </div>
    </header>
  );
}