"use client";

import { useState, type FormEvent } from "react";
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
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Pezzo 2: upload to Storage + insert into sheets
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

    // A) Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from("sheets")
      .upload(path, file);

    if (uploadError) {
      setMessage(uploadError.message);
      setIsSubmitting(false);
      return;
    }

    // B) Public URL
    const { data: publicUrlData } = supabase.storage
      .from("sheets")
      .getPublicUrl(path);

    const publicUrl = publicUrlData.publicUrl;

    // C) Insert row
    const { error: insertError } = await supabase.from("sheets").insert({
      title,
      artist,
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
    setFile(null);
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
            <label htmlFor="file" className="text-sm font-medium">
              Sheet image
            </label>
            <Input
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
