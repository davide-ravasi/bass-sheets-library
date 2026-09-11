import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: sheets, error } = await supabase
    .from("sheets")
    .select("id, title, artist, thumbnail_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Sheet catalog</h1>
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
