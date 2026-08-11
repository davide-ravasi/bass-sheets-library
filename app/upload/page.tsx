import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Upload</h1>
        <p className="text-muted-foreground">
          Upload your first sheet to get started. Then you can search and
          filter.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload not implemented yet</CardTitle>
          <CardDescription>Upload not implemented yet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Upload not implemented yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
