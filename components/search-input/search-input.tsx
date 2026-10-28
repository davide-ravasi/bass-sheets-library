import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SearchInput({
  searchParams,
}: {
  searchParams: { status?: string; q?: string; difficulty?: string };
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
      <Input
        id="input-search"
        type="text"
        placeholder="Search"
        name="q"
        defaultValue={searchParams.q ?? ""}
      />
      {searchParams.q && (
        <Link
          href={(() => {
            const params = new URLSearchParams();
            if (searchParams.status) {
              params.set("status", searchParams.status);
            }
            if (searchParams.difficulty) {
              params.set("difficulty", searchParams.difficulty);
            }
            return params.toString() ? `/?${params.toString()}` : "/";
          })()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear search
        </Link>
      )}
      <Button type="submit">Search</Button>
    </form>
  );
}
