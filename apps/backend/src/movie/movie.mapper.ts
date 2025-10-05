import { mapCertification } from '../utils/certification-mapper';

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

export const mapDetail = (data: { detail: any; certification?: string }) => {
  const { detail, certification } = data;

  return {
    id: detail.id,
    title: detail.title ?? detail.name,
    poster: IMG(detail.poster_path, 'w500'),
    backdrop: IMG(detail.backdrop_path, 'original'),
    overview: detail.overview ?? '',
    releaseDate: detail.release_date ?? detail.first_air_date ?? undefined,
    runtime: detail.runtime ?? undefined,
    genres: (detail.genres ?? []).map((g: any) => g.name),
    rating: detail.vote_average ?? undefined,
    certification: mapCertification(certification || ''),
  };
};
