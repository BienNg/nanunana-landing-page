"use client";

/** Full reload so the latest stats are read from storage, not the router cache. */
export function RefreshLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        window.location.assign(href);
      }}
      className="inline-flex min-h-tap items-center rounded-control px-3 text-label-md text-brand-teal-dark hover:underline"
    >
      Refresh
    </a>
  );
}
