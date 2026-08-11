import Link from "next/link";
export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight hover:opacity-90"
        >
          Bass Sheets
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/upload"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
}
