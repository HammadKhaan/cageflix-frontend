// src/utils/api.ts
export type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
};

const BASE_URL = "http://localhost:8000";

// Helper to wrap fetch with error handling
async function fetchWithHandling<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    // You could add more sophisticated error handling here, like parsing error JSON, etc.
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Fetch all movies
export async function fetchMovies(): Promise<Movie[]> {
  return fetchWithHandling<Movie[]>(`${BASE_URL}/movies`);
}

// Fetch movies by genre
export async function fetchMoviesByGenre(genre: string): Promise<Movie[]> {
  return fetchWithHandling<Movie[]>(`${BASE_URL}/movies?genre=${encodeURIComponent(genre)}`);
}

// Fetch poster for movie
export async function fetchPoster(movieId: string): Promise<string | null> {
  try {
    const data = await fetchWithHandling<{ poster?: string }>(`${BASE_URL}/poster/${movieId}`);
    return data.poster ?? null;
  } catch {
    return null; // fallback to null if error occurs (e.g., no poster)
  }
}
