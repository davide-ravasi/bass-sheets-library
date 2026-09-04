import { SheetUploadForm } from "@/components/upload/sheet-upload-form";

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

      <SheetUploadForm />
    </div>
  );
}
