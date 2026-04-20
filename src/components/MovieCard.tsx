import { useState } from 'react';
import type { Movie, MovieRating } from '../types';

interface Props {
  movie: Movie;
  onMarkWatched: (id: string, rating?: MovieRating, review?: string) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ movie, onMarkWatched, onDelete }: Props) {
  const [rating, setRating] = useState<MovieRating | undefined>(undefined);
  const [review, setReview] = useState('');
  const [showRating, setShowRating] = useState(false);

  function handleMarkWatched() {
    if (!rating) return;
    onMarkWatched(movie.id, rating, review.trim() || undefined);
    resetForm();
  }

  function handleCancel() {
    resetForm();
  }

  function resetForm() {
    setRating(undefined);
    setReview('');
    setShowRating(false);
  }

  return (
    <div className={`movie-card ${movie.status}`}>
      <div className="movie-card-header">
        <span className="movie-title">{movie.title}</span>
        <div className="movie-card-actions">
          {movie.status === 'planned' && !showRating && (
            <button
              className="btn btn-secondary"
              onClick={() => setShowRating(true)}
            >
              Просмотрено
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() => onDelete(movie.id)}
          >
            ✕
          </button>
        </div>
      </div>

      {movie.status === 'watched' && movie.rating && (
        <>
          <div className="movie-rating">
            {'★'.repeat(movie.rating)}{'☆'.repeat(10 - movie.rating)}
          </div>

          {movie.review && (
            <div className="movie-review">
              <p>{movie.review}</p>
            </div>
          )}
        </>
      )}

      {showRating && (
        <div className="rating-picker">
          <div className="rating-picker-content">
            <span className="rating-label">Оценка:</span>
            <div className="stars-container">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as MovieRating[]).map((n) => (
                <button
                  key={n}
                  className={`star-btn ${rating === n ? 'selected' : ''}`}
                  onClick={() => setRating(n)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="textarea textarea-small"
            placeholder="Добавьте отзыв"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={2}
          />

          <div className="rating-picker-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleMarkWatched}
              disabled={!rating}
            >
              Сохранить
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleCancel}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <span className={`status-badge ${movie.status}`}>
        {movie.status === 'watched' ? 'Просмотрено' : 'В планах'}
      </span>
    </div>
  );
}