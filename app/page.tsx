import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

type Status = "to-learn" | "practicing" | "mastered";

const statusOptions: { label: string; value: Status | "" }[] = [
  { label: "All", value: "" },
  { label: "To learn", value: "to-learn" },
  { label: "Practicing", value: "practicing" },
  { label: "Mastered", value: "mastered" },
];

const statusStyle: Record<Status, string> = {
  "to-learn":
    "border-mauve-200 bg-mauve-100 text-mauve-800 dark:border-mauve-800 dark:bg-mauve-950 dark:text-mauve-200",
  practicing:
    "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  mastered:
    "border-teal-200 bg-teal-100 text-teal-800 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-200",
};

const filterBase = "text-sm rounded-md border px-2 py-1 transition-colors";
const filterIdle = "border-border text-muted-foreground hover:bg-muted";
const filterAllActive = "border-border bg-muted text-foreground";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const status =
    statusParam === "to-learn" ||
    statusParam === "practicing" ||
    statusParam === "mastered"
      ? statusParam
      : undefined;

  const supabase = await createClient();
  let query = supabase
    .from("sheets")
    .select("id, title, artist, thumbnail_url, created_at")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data: sheets, error } = await query;

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Sheet catalog</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by status:</span>
          {statusOptions.map(({ value, label }) => {
            const isActive = value === "" ? !status : status === value;
            const href = value ? `/?status=${value}` : "/";
            const activeClass =
              value === "" ? filterAllActive : statusStyle[value];

            return (
              <Link
                key={label}
                href={href}
                className={cn(filterBase, isActive ? activeClass : filterIdle)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {sheets && sheets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sheets.map((sheet) => (
            <Link
              href={`/sheets/${sheet.id}`}
              key={sheet.id}
              className="focus-visible:ring"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{sheet.title}</CardTitle>
                  <CardDescription>{sheet.artist}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={sheet.thumbnail_url}
                    alt={sheet.title}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No sheets yet</CardTitle>
            <CardDescription>
              When you upload the first photo, it will show up here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Go to{" "}
              <Link
                href="/upload"
                className="text-primary underline underline-offset-4"
              >
                Upload
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
