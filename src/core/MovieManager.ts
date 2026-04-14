import type {
  Movie,
  MovieListItem,
  MovieStatus,
  CatalogStats,
  CreateMovieInput,
  UpdateMovieProgress,
} from '../types';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export class MovieManager {
  private movies: Movie[] = [];

  // Добавление

  addMovie(input: CreateMovieInput): Movie {
    const movie: Movie = {
      id: generateId(),
      title: input.title,
      status: input.status,
      createdAt: new Date(),
    };
    this.movies.push(movie);
    return movie;
  }

  // Обновление

  updateMovie(id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>): Movie | null {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) return null;

    this.movies[index] = { ...this.movies[index], ...updates };
    return this.movies[index];
  }
  markAsWatched(id: string, progress: UpdateMovieProgress): Movie | null {
    return this.updateMovie(id, progress);
  }

  // Удаление

  deleteMovie(id: string): boolean {
    const before = this.movies.length;
    this.movies = this.movies.filter((m) => m.id !== id);
    return this.movies.length < before;
  }

  // Получение данных

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
    }));
  }

  getMovieById(id: string): Movie | null {
    return this.movies.find((m) => m.id === id) ?? null;
  }

  // Статистика 

  getStats(): CatalogStats {
    const watched = this.movies.filter((m) => m.status === 'watched');
    const ratings = watched
      .filter((m) => m.rating !== undefined)
      .map((m) => m.rating as number);

    return {
      total: this.movies.length,
      watched: watched.length,
      planned: this.movies.length - watched.length,
      averageRating:
        ratings.length > 0
          ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
          : null,
    };
  }

  // Сохранение и загрузка

  getAllMovies(): ReadonlyArray<Movie> {
    return this.movies;
  }

  loadMovies(movies: Movie[]): void {
    this.movies = movies.map((m) => ({
      ...m,
      createdAt: new Date(m.createdAt),
    }));
  }
}

export const movieManager = new MovieManager();