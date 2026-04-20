import { describe, it, expect, beforeEach } from 'vitest';
import { MovieManager } from './MovieManager';

let manager: MovieManager;

beforeEach(() => {
  manager = new MovieManager();
});

describe('addMovie', () => {
  it('добавляет фильм и возвращает его', () => {
    const movie = manager.addMovie({ title: 'Inception', status: 'planned' });

    expect(movie.title).toBe('Inception');
    expect(movie.status).toBe('planned');
    expect(movie.id).toBeTruthy();
  });

  it('добавленный фильм появляется в списке', () => {
    manager.addMovie({ title: 'Inception', status: 'planned' });

    expect(manager.getMovieList()).toHaveLength(1);
  });
});

describe('updateMovie', () => {
  it('обновляет поля фильма', () => {
    const movie = manager.addMovie({ title: 'Inception', status: 'planned' });
    const updated = manager.updateMovie(movie.id, { title: 'Inception 2' });

    expect(updated?.title).toBe('Inception 2');
  });

  it('возвращает null если фильм не найден', () => {
    const result = manager.updateMovie('несуществующий-id', { title: 'Тест' });

    expect(result).toBeNull();
  });
});

describe('markAsWatched', () => {
  it('меняет статус на watched и сохраняет оценку', () => {
    const movie = manager.addMovie({ title: 'Dune', status: 'planned' });
    const updated = manager.markAsWatched(movie.id, {
      status: 'watched',
      rating: 9,
      review: 'Отличный фильм',
    });

    expect(updated?.status).toBe('watched');
    expect(updated?.rating).toBe(9);
    expect(updated?.review).toBe('Отличный фильм');
  });
});

describe('deleteMovie', () => {
  it('удаляет фильм и возвращает true', () => {
    const movie = manager.addMovie({ title: 'Dune', status: 'planned' });
    const result = manager.deleteMovie(movie.id);

    expect(result).toBe(true);
    expect(manager.getMovieList()).toHaveLength(0);
  });

  it('возвращает false если фильм не найден', () => {
    const result = manager.deleteMovie('несуществующий-id');

    expect(result).toBe(false);
  });
});

describe('getMovieList', () => {
  it('возвращает все фильмы без фильтра', () => {
    manager.addMovie({ title: 'Dune', status: 'planned' });
    manager.addMovie({ title: 'Inception', status: 'watched' });

    expect(manager.getMovieList()).toHaveLength(2);
  });

  it('фильтрует по статусу', () => {
    manager.addMovie({ title: 'Dune', status: 'planned' });
    manager.addMovie({ title: 'Inception', status: 'watched' });

    expect(manager.getMovieList('planned')).toHaveLength(1);
    expect(manager.getMovieList('watched')).toHaveLength(1);
  });

  it('не содержит поле review', () => {
    manager.addMovie({ title: 'Dune', status: 'planned' });
    const [item] = manager.getMovieList();

    expect(item).not.toHaveProperty('review');
  });
});

describe('getStats', () => {
  it('возвращает корректную статистику', () => {
    manager.addMovie({ title: 'Dune', status: 'planned' });
    manager.addMovie({ title: 'Inception', status: 'watched' });
    manager.markAsWatched(
      manager.getMovieList('watched')[0].id,
      { status: 'watched', rating: 8 }
    );

    const stats = manager.getStats();

    expect(stats.total).toBe(2);
    expect(stats.watched).toBe(1);
    expect(stats.planned).toBe(1);
  });
});