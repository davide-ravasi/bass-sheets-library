import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function SheetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sheet, error } = await supabase
    .from("sheets")
    .select("id, title, artist, image_url, created_at")
    .eq("id", id)
    .single();

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{sheet.title}</h1>
      </div>

      {sheet ? (
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>
                {sheet.artist} -{" "}
                {new Date(sheet.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={sheet.image_url}
                alt={sheet.title}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
      ) : (
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
              </Link>
              to see the available sheets.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
