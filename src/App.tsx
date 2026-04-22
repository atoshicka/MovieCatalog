import { useState, useEffect } from 'react';
import { movieManager } from './core/MovieManager';
import type { Movie, MovieStatus, MovieRating } from './types';
import { StatsBar } from './components/StatsBar';
import { AddMovieForm } from './components/AddMovieForm';
import { MovieCard } from './components/MovieCard';
import './index.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<MovieStatus | 'all'>('all');

  useEffect(() => {
    const saved = localStorage.getItem('movies');
    if (saved) {
      movieManager.loadMovies(JSON.parse(saved));
    }
    setMovies(movieManager.getAllMovies());
  }, []);

  function sync() {
    localStorage.setItem('movies', JSON.stringify(movieManager.getAllMovies()));
    setMovies(movieManager.getAllMovies());
  }

  function handleAdd(title: string, status: MovieStatus, rating?: MovieRating, review?: string) {
    movieManager.addMovie({ title, status, rating, review });
    sync();
  }

  function handleMarkWatched(id: string, rating?: MovieRating, review?: string) {
    movieManager.updateMovie(id, {
      status: 'watched',
      rating,
      review,
    });
    sync();
  }

  function handleDelete(id: string) {
    movieManager.deleteMovie(id);
    sync();
  }

  const stats = movieManager.getStats();

  const filtered = filter === 'all'
    ? movies
    : movies.filter((m) => m.status === filter);

  return (
    <div className="app">
      <h1 className="app-title">Каталог фильмов</h1>

      <StatsBar
        total={stats.total}
        watched={stats.watched}
        planned={stats.planned}
      />

      <AddMovieForm onAdd={handleAdd} />

      <div className="filter-bar">
        {(['all', 'watched', 'planned'] as const).map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Все' : f === 'watched' ? 'Просмотрено' : 'В планах'}
          </button>
        ))}
      </div>

      <div className="movie-list">
        {filtered.length === 0 && (
          <p className="empty">Пусто</p>
        )}
        {filtered.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMarkWatched={handleMarkWatched}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}