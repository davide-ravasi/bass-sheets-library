import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buildHref } from "@/lib/utils";

export function SearchInput({
  searchParams,
}: {
  searchParams: { status?: string; q?: string; difficulty?: string; genre?: string };
}) {
  return (
    <form method="GET" action="/" className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">
        Search by title or artist:
      </span>
      {searchParams.status ? (
        <input type="hidden" name="status" value={searchParams.status} />
      ) : null}
      {searchParams.difficulty ? (
        <input
          type="hidden"
          name="difficulty"
          value={searchParams.difficulty}
        />
      ) : null}
      {searchParams.genre ? (
        <input
          type="hidden"
          name="genre"
          value={searchParams.genre}
        />
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
          href={buildHref({ status: searchParams.status, difficulty: searchParams.difficulty, genre: searchParams.genre })}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear search
        </Link>
      )}
      <Button type="submit">Search</Button>
    </form>
  );
}
