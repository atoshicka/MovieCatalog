import { describe, it, expectTypeOf } from 'vitest';
import { MovieManager } from './MovieManager';
import type { Movie, MovieListItem, CatalogStats } from '../types';

const manager = new MovieManager();

describe('типы MovieManager', () => {
  it('addMovie возвращает Movie', () => {
    expectTypeOf(manager.addMovie).returns.toEqualTypeOf<Movie>();
  });

  it('getMovieList возвращает массив MovieListItem', () => {
    expectTypeOf(manager.getMovieList).returns.toEqualTypeOf<MovieListItem[]>();
  });

  it('getMovieById возвращает Movie или null', () => {
    expectTypeOf(manager.getMovieById).returns.toEqualTypeOf<Movie | null>();
  });

  it('deleteMovie возвращает boolean', () => {
    expectTypeOf(manager.deleteMovie).returns.toEqualTypeOf<boolean>();
  });

  it('getStats возвращает CatalogStats', () => {
    expectTypeOf(manager.getStats).returns.toEqualTypeOf<CatalogStats>();
  });
});