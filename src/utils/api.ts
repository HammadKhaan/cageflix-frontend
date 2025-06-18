import type { Movie } from "../types/Movie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchWithHandling<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchMovies(): Promise<Movie[]> {
  const data = await fetchWithHandling<{ results: Movie[] }>(`${BASE_URL}/movies`);
  return data.results;
}

export async function fetchSearchedMovies(): Promise<Movie[]> {
  const data = await fetchWithHandling<{ results: Movie[] }>(`${BASE_URL}/movies?limit=9999`);
  return data.results;
}

export async function fetchMoviesByGenre(
  genre: string,
  offset = 0,
  limit = 10
): Promise<{ results: Movie[]; total: number }> {
  return fetchWithHandling(`${BASE_URL}/movies?genre=${encodeURIComponent(genre)}&limit=${limit}&offset=${offset}`);
}

export async function fetchPoster(movieId: string): Promise<string | null> {
  try {
    const data = await fetchWithHandling<{ poster?: string }>(`${BASE_URL}/poster/${movieId}`);
    return data.poster ?? null;
  } catch {
    return null;
  }
}
