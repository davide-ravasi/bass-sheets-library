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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";

export function SheetUploadForm() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [composer, setComposer] = useState("");
  const [genre, setGenre] = useState("");
  const [key, setKey] = useState("");
  const [timeSignature, setTimeSignature] = useState("");
  const [tempo, setTempo] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [notationType, setNotationType] = useState("");
  const [status, setStatus] = useState("");
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

    const genreArray = genre
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const { error: insertError } = await supabase.from("sheets").insert({
      title,
      artist,
      tempo: tempo === "" ? null : parseInt(tempo, 10),
      difficulty: difficulty === "" ? null : parseInt(difficulty, 10),
      notation_type: notationType === "" ? null : notationType,
      genre: genreArray.length === 0 ? null : genreArray,
      key: key === "" ? null : key,
      time_signature: timeSignature === "" ? null : timeSignature,
      composer: composer === "" ? null : composer,
      status: status === "" ? null : status,
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
    setComposer("");
    setGenre("");
    setKey("");
    setTimeSignature("");
    setTempo("");
    setDifficulty("");
    setNotationType("");
    setStatus("");
    setFile(null);
    setFileInputKey((prev) => prev + 1);
    setIsSubmitting(false);
  }

  const statusOptions = [
    { label: "To learn", value: "to-learn" },
    { label: "Practicing", value: "practicing" },
    { label: "Mastered", value: "mastered" },
  ];

  const difficultyOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  const notationTypeOptions = [
    { label: "Standard", value: "standard" },
    { label: "Tab", value: "tab" },
    { label: "Both", value: "both" },
    { label: "Chord", value: "chord" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>New sheet</CardTitle>
        <CardDescription>
          Upload an image and fill in what you know. Only title, artist, and
          image are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">Identity</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
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
                <label htmlFor="composer" className="text-sm font-medium">
                  Composer
                </label>
                <Input
                  id="composer"
                  name="composer"
                  value={composer}
                  onChange={(event) => setComposer(event.target.value)}
                  placeholder="John Deacon"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">Music</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="key" className="text-sm font-medium">
                  Key
                </label>
                <Input
                  id="key"
                  name="key"
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
                  placeholder="Em"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time_signature" className="text-sm font-medium">
                  Time signature
                </label>
                <Input
                  id="time_signature"
                  name="time_signature"
                  value={timeSignature}
                  onChange={(event) => setTimeSignature(event.target.value)}
                  placeholder="4/4"
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
                <label htmlFor="notation_type" className="text-sm font-medium">
                  Notation type
                </label>
                <Select
                  items={notationTypeOptions}
                  value={notationType}
                  onValueChange={(value: string | null) =>
                    setNotationType(value ?? "")
                  }
                >
                  <SelectTrigger id="notation_type" className="w-full">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a notation type</SelectLabel>
                      {notationTypeOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">Practice</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm font-medium">
                  Difficulty
                </label>
                <Select
                  items={difficultyOptions}
                  value={difficulty}
                  onValueChange={(value: string | null) =>
                    setDifficulty(value ?? "")
                  }
                >
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a difficulty</SelectLabel>
                      {difficultyOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  items={statusOptions}
                  value={status}
                  onValueChange={(value: string | null) =>
                    setStatus(value ?? "to-learn")
                  }
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a status</SelectLabel>
                      {statusOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">Classification</legend>
            <div className="space-y-2">
              <label htmlFor="genre" className="text-sm font-medium">
                Genre
              </label>
              <Input
                id="genre"
                name="genre"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                placeholder="Rock, Funk"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple genres with commas.
              </p>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium">File</legend>
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
          </fieldset>

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
