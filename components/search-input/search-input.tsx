import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SearchInput({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  return (
    <form method="GET" action="/" className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">
        Search by title or artist:
      </span>
      {searchParams.status ? (
        <input type="hidden" name="status" value={searchParams.status} />
      ) : null}
      <Input
        id="input-search"
        type="text"
        placeholder="Search"
        name="q"
        defaultValue={searchParams.q ?? ""}
      />
      {searchParams.q && (
        <Link
          href={`${searchParams.status ? "/?" + new URLSearchParams({ status: searchParams.status }).toString() : "/"}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear search
        </Link>
      )}
      <Button type="submit">Search</Button>
    </form>
  );
}
