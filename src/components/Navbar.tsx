"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-2 py-2">

        <img
          src="/logo.jpg"
          alt="BeaconBD"
          className="h-12 w-auto rounded-xl border-2 border-green-700 object-contain sm:h-14"
        />

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
                <span className="hidden text-sm font-semibold sm:inline">
                  {session.user.name}
                </span>

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