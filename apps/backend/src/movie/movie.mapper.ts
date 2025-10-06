const IMG = (
  path?: string,
  size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w342',
) => (path ? `${process.env.TMDB_API_BASE_IMG}/${size}${path}` : '');

export const mapList = (item: any) => ({
  id: item.id,
  title: item.title ?? item.name,
  poster: IMG(item.poster_path, 'w342'),
  backdrop: IMG(item.backdrop_path, 'w780'),
  overview: item.overview ?? '',
  releaseDate: item.release_date ?? item.first_air_date ?? undefined,
  rating: item.vote_average ?? undefined,
});

export const mapDetail = (data: { detail: any }) => {
  const { detail } = data;

  return {
    id: detail.id,
    title: detail.title ?? detail.name,
    poster: IMG(detail.poster_path, 'w500'),
    backdrop: IMG(detail.backdrop_path, 'original'),
    overview: detail.overview ?? '',
    releaseDate: detail.release_date ?? detail.first_air_date ?? undefined,
    rating: detail.vote_average ?? undefined,
  };
};
