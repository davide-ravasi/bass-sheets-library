import Link from "next/link";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

const statusLabels: Record<string, string> = {
  "to-learn": "To learn",
  practicing: "Practicing",
  mastered: "Mastered",
};

const statusStyle: Record<string, string> = {
  "to-learn":
    "border-mauve-200 bg-mauve-100 text-mauve-800 dark:border-mauve-800 dark:bg-mauve-950 dark:text-mauve-200",
  practicing:
    "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  mastered:
    "border-teal-200 bg-teal-100 text-teal-800 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-200",
};

const statusStyleFallback =
  "border-border bg-muted text-muted-foreground";

const notationLabels: Record<string, string> = {
  standard: "Standard",
  tab: "Tab",
  both: "Both",
  chord: "Chord",
};

function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center rounded-4xl border border-border px-2 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

export default async function SheetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sheet, error } = await supabase
    .from("sheets")
    .select(
      "id, title, artist, composer, genre, techniques, tags, notes, key, time_signature, tempo, difficulty, notation_type, status, image_url, created_at",
    )
    .eq("id", id)
    .single();

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!sheet) {
    return (
      <div className="space-y-6">
        <p>
          <Link
            href="/"
            className="text-sm text-primary underline underline-offset-4"
          >
            Back to catalog
          </Link>
        </p>
        <Card>
          <CardHeader>
            <CardTitle>No sheet found</CardTitle>
            <CardDescription>
              The sheet you are looking for does not exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Go to the{" "}
              <Link
                href="/"
                className="text-primary underline underline-offset-4"
              >
                home page
              </Link>{" "}
              to see the available sheets.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusLabel = sheet.status
    ? (statusLabels[sheet.status] ?? sheet.status)
    : null;
  const notationLabel = sheet.notation_type
    ? (notationLabels[sheet.notation_type] ?? sheet.notation_type)
    : null;
  const genres = Array.isArray(sheet.genre) ? sheet.genre.filter(Boolean) : [];

  const techniques = Array.isArray(sheet.techniques)
    ? sheet.techniques.filter(Boolean)
    : [];
  const tags = Array.isArray(sheet.tags) ? sheet.tags.filter(Boolean) : [];

  const musicMeta = [
    sheet.key ? `Key ${sheet.key}` : null,
    sheet.time_signature ?? null,
    sheet.tempo != null ? `${sheet.tempo} BPM` : null,
    sheet.difficulty != null ? `Level ${sheet.difficulty}/5` : null,
    notationLabel,
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <p>
        <Link
          href="/"
          className="text-sm text-primary underline underline-offset-4"
        >
          Back to catalog
        </Link>
      </p>

      <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr] lg:grid-cols-[minmax(0,18rem)_1fr] md:items-start">
        <aside className="space-y-5 md:sticky md:top-20">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              {sheet.title}
            </h1>
            <p className="text-lg text-muted-foreground">{sheet.artist}</p>
            {sheet.composer && (
              <p className="text-sm text-muted-foreground">
                Composer: {sheet.composer}
              </p>
            )}
          </div>

          {(statusLabel || musicMeta.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {statusLabel && (
                <Badge
                  className={
                    (sheet.status && statusStyle[sheet.status]) ||
                    statusStyleFallback
                  }
                >
                  {statusLabel}
                </Badge>
              )}
              {musicMeta.map((item) => (
                <MetaChip key={item}>{item}</MetaChip>
              ))}
            </div>
          )}

          {genres.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Genre
              </p>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <MetaChip key={g}>{g}</MetaChip>
                ))}
              </div>
            </div>
          )}

          {techniques.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Techniques
              </p>
              <div className="flex flex-wrap gap-2">
                {techniques.map((t) => (
                  <MetaChip key={t}>{t}</MetaChip>
                ))}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <MetaChip key={t}>{t}</MetaChip>
                ))}
              </div>
            </div>
          )}

          {sheet.notes && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notes
              </p>
              <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                {sheet.notes}
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Added {new Date(sheet.created_at).toLocaleDateString()}
          </p>
        </aside>

        <div className="min-w-0">
          <img
            src={sheet.image_url}
            alt={sheet.title}
            className="w-full h-auto rounded-lg border border-border bg-muted"
          />
        </div>
      </div>
    </div>
  );
}
