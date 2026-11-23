import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface buildHrefParams {
  status?: string;
  difficulty?: string;
  genre?: string;
  query?: string;
}

export function buildHref(params: buildHrefParams) {
  const searchParams = new URLSearchParams();
  const { status, difficulty, genre, query } = params;

  if (status) {
    searchParams.set("status", status);
  }
  if (difficulty) {
    searchParams.set("difficulty", difficulty.toString());
  }
  if (genre) {
    searchParams.set("genre", genre);
  }
  if (query) {
    searchParams.set("q", query);
  }

  return searchParams.toString() ? `/?${searchParams.toString()}` : "/";
}
