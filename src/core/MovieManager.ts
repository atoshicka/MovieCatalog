import type {
  Movie,
  MovieListItem,
  MovieStatus,
  CatalogStats,
  CreateMovieInput,
} from '../types';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export class MovieManager {
  private movies: Movie[] = [];

  addMovie(input: CreateMovieInput): Movie {
    const movie: Movie = {
      ...input,
      id: generateId(),
      createdAt: new Date(),
    };
    this.movies.push(movie);
    return movie;
  }

  updateMovie(id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>): Movie | null {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) return null;

    this.movies[index] = { ...this.movies[index], ...updates };
    return this.movies[index];
  }

  deleteMovie(id: string): boolean {
    const before = this.movies.length;
    this.movies = this.movies.filter((m) => m.id !== id);
    return this.movies.length < before;
  }

  getMovieList(filterStatus?: MovieStatus): MovieListItem[] {
    const filtered = filterStatus
      ? this.movies.filter((m) => m.status === filterStatus)
      : this.movies;

    return filtered.map(({ id, title, status, rating, createdAt }) => ({
      id,
      title,
      status,
      rating,
      createdAt,
    })).reverse();
  }

  getMovieById(id: string): Movie | null {
    return this.movies.find((m) => m.id === id) ?? null;
  }

  getStats(): CatalogStats {
    const watched = this.movies.filter((m) => m.status === 'watched');
    return {
      total: this.movies.length,
      watched: watched.length,
      planned: this.movies.length - watched.length,
    };
  }

  getAllMovies(): Movie[] {
    return [...this.movies].reverse();
  }

  loadMovies(movies: Movie[]): void {
    this.movies = movies.map((m) => ({
      ...m,
      createdAt: new Date(m.createdAt),
    }));
  }
}

export const movieManager = new MovieManager();