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

export function SheetUploadForm() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Pezzo 2: upload to Storage + insert into sheets
    console.log({
      title,
      artist,
      fileName: file?.name ?? null,
      fileSize: file?.size ?? null,
    });
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

          <Button type="submit">Save sheet</Button>
        </form>
      </CardContent>
    </Card>
  );
}
