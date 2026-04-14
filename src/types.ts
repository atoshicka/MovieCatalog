// статус фильма
export type MovieStatus = 'watched' | 'planned';

// оценка от 1 до 10
export type MovieRating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Movie {
  id: string;           // уникальный ID
  title: string;        // название фильма
  status: MovieStatus;  // статус (посмотрел/в планах)
  rating?: MovieRating; // оценка (только для просмотренных)
  review?: string;      // отзыв (опционально)
  createdAt: Date;      // дата добавления
}

// создание фильма
export type CreateMovieInput = Pick<Movie, 'title' | 'status'>;

export interface CreateWatchedMovieInput extends CreateMovieInput {
  status: 'watched';
  rating?: MovieRating;
  review?: string;
}

// данные для обновления просмотренного фильма
export interface UpdateMovieProgress extends Pick<Movie, 'status' | 'rating' | 'review'> {
  status: 'watched';
}

export type MovieListItem = Pick<Movie, 'id' | 'title' | 'status' | 'rating' | 'createdAt'>;

// статистика
export interface CatalogStats {
  total: number;
  watched: number;
  planned: number;
  averageRating: number | null;
}