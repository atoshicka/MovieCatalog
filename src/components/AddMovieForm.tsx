import { useState } from 'react';
import type { MovieStatus, MovieRating } from '../types';

interface Props {
  onAdd: (title: string, status: MovieStatus, rating?: MovieRating, review?: string) => void;
}

export function AddMovieForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<MovieStatus>('planned');
  const [rating, setRating] = useState<MovieRating | undefined>(undefined);
  const [review, setReview] = useState('');
  const [showRating, setShowRating] = useState(false);

  function handleSubmit() {
    if (!title.trim()) return;

    if (status === 'watched' && !rating) {
      setShowRating(true);
      return;
    }

    onAdd(title.trim(), status, rating, status === 'watched' ? review.trim() || undefined : undefined);
    resetForm();
  }

  function resetForm() {
    setTitle('');
    setStatus('planned');
    setRating(undefined);
    setReview('');
    setShowRating(false);
  }

  function handleStatusChange(newStatus: MovieStatus) {
    setStatus(newStatus);
    if (newStatus === 'watched' && !showRating) {
      setShowRating(true);
    } else if (newStatus === 'planned') {
      setShowRating(false);
      setRating(undefined);
      setReview('');
    }
  }

  function handleRatingSelect(value: MovieRating) {
    setRating(value);
  }

  return (
    <div className="add-form-container">
      <div className="add-form">
        <input
          className="input"
          type="text"
          placeholder="Название фильма..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <select
          className="select"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as MovieStatus)}
        >
          <option value="planned">В планах</option>
          <option value="watched">Просмотрено</option>
        </select>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Добавить
        </button>
      </div>

      {showRating && status === 'watched' && (
        <div className="rating-picker-form">
          <span className="rating-label">Выберите оценку:</span>
          <div className="stars-container">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as MovieRating[]).map((n) => (
              <button
                key={n}
                className={`star-btn ${rating === n ? 'selected' : ''}`}
                onClick={() => handleRatingSelect(n)}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="textarea textarea-small"
            placeholder="Добавьте отзыв"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={2}
          />
        </div>
      )}
    </div>
  );
}