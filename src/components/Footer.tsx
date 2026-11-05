export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="text-xl font-black">
  <span className="text-[#064e3b] dark:text-[#10b981]">Beacon</span>
  <span className="text-[#991b1b] dark:text-[#f87171]">BD</span>
</div>

          <p className="muted mt-3 max-w-sm">A community-driven platform for turning small acts of service into visible local impact.</p>
        </div>
        <div>
          <h3 className="font-bold">Explore</h3>
          <p className="muted mt-3">Upcoming events · Create an event · Joined events</p>
        </div>
        <div>
          <h3 className="font-bold">Connect</h3>
          <p className="muted mt-3">Facebook · Instagram · X · hello@BeaconBD.community</p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-5 text-center text-sm muted">© 2026 BeaconBD. Built for community impact.</div>
    </footer>
  );
}
