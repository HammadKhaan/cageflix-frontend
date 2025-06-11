type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
  posterUrl: string;  // ✅ add this if not already present
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function fetchWithHandling<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchMovies(): Promise<Movie[]> {
  return fetchWithHandling<Movie[]>(`${BASE_URL}/movies`);
}

export async function fetchMoviesByGenre(genre: string): Promise<Movie[]> {
  return fetchWithHandling<Movie[]>(`${BASE_URL}/movies?genre=${encodeURIComponent(genre)}`);
}

export async function fetchPoster(movieId: string): Promise<string | null> {
  try {
    const data = await fetchWithHandling<{ poster?: string }>(`${BASE_URL}/poster/${movieId}`);
    return data.poster ?? null;
  } catch {
    return null;
  }
}
