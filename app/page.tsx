import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Sheet catalog</h1>
        <p className="text-muted-foreground">
          Add your first sheet to get started. Then you can search and filter.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No sheets yet</CardTitle>
          <CardDescription>
            When you upload the first photo, it will show up here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Next step: upload + persistence on Supabase.
          </p>
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
    </div>
  );
}
