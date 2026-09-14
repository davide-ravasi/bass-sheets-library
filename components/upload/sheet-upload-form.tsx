"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export function SheetUploadForm() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [tempo, setTempo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const supabase = createClient();
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()!.toLowerCase()
      : "jpg";
    const path = `${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("sheets")
      .upload(path, file);

    if (uploadError) {
      setMessage(uploadError.message);
      setIsSubmitting(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("sheets")
      .getPublicUrl(path);

    const publicUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from("sheets").insert({
      title,
      artist,
      tempo: tempo === "" ? null : parseInt(tempo, 10),
      image_url: publicUrl,
      thumbnail_url: publicUrl,
      original_filename: file.name,
    });

    if (insertError) {
      setMessage(insertError.message);
      setIsSubmitting(false);
      return;
    }

    setMessage("Sheet saved.");
    setTitle("");
    setArtist("");
    setTempo("");
    setFile(null);
    setFileInputKey((key) => key + 1);
    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New sheet</CardTitle>
        <CardDescription>
          Add a title, artist, and an image of your sheet. Saving comes next.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Another One Bites The Dust"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="artist" className="text-sm font-medium">
              Artist
            </label>
            <Input
              id="artist"
              name="artist"
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
              placeholder="Queen"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tempo" className="text-sm font-medium">
              Tempo
            </label>
            <Input
              id="tempo"
              type="number"
              name="tempo"
              value={tempo}
              onChange={(event) => setTempo(event.target.value)}
              placeholder="120"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Sheet image
            </label>
            <Input
              key={fileInputKey}
              id="file"
              name="file"
              type="file"
              accept="image/*"
              required
              onChange={(event) => {
                const nextFile = event.target.files?.[0] ?? null;
                setFile(nextFile);
              }}
            />
            {previewUrl && file && (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="max-h-80 w-auto rounded-md"
                />
                <p className="text-sm text-muted-foreground">{file.name}</p>
              </div>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save sheet"}
          </Button>

          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
