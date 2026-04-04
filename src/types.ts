// статус фильма
export type MovieStatus = 'watched' | 'planned';

// оценка от 1 до 10 
export type MovieRating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Movie {
  id: string;               // уникальный ID
  title: string;            // название фильма
  status: MovieStatus;      // статус (посмотрел/в планах)
  rating?: MovieRating;     // оценка 
  review?: string;          // отзыв (опционально)
  createdAt: Date;          // дата добавления 
}

export type CreateMovieInput = Pick<Movie, 'title' | 'status'>;

// если посмотрели фильм, который был в планах
export interface UpdateMovieProgress extends Pick<Movie, 'status' | 'rating' | 'review'> {
  status: 'watched';
}