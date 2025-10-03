const IMG = (
  path?: string,
  size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w342',
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : '');

export const mapList = (item: any) => ({
  id: item.id,
  title: item.title ?? item.name,
  poster: IMG(item.poster_path, 'w342'),
  backdrop: IMG(item.backdrop_path, 'w780'),
  overview: item.overview ?? '',
  releaseDate: item.release_date ?? item.first_air_date ?? undefined,
  rating: item.vote_average ?? undefined,
});

export const mapDetail = (item: any) => ({
  id: item.id,
  title: item.title ?? item.name,
  poster: IMG(item.poster_path, 'w500'),
  backdrop: IMG(item.backdrop_path, 'original'),
  overview: item.overview ?? '',
  releaseDate: item.release_date ?? item.first_air_date ?? undefined,
  runtime: item.runtime ?? undefined,
  genres: (item.genres ?? []).map((g: any) => g.name),
  rating: item.vote_average ?? undefined,
});
