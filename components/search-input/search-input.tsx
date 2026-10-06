"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchInput({
  searchParams,
}: {
  searchParams: { status: string; q: string };
}) {
  return (
    <form
      method="GET"
      action={`/`}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-sm text-muted-foreground">
        Search by title or artist:
      </span>
      <Input type="hidden" name="status" value={searchParams.status} />
      <Input
        id="input-search"
        type="text"
        placeholder="Search"
        name="q"
        defaultValue={searchParams.q}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
