// DTO ที่ตรงกับข้อมูลจาก Backend NestJS

export interface MovieListDto {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

export type MovieDetailDto = MovieListDto;

// Response จาก API /movies?page=1
export interface MovieListResponse {
  items: MovieListDto[];
  page: number;
  totalPages: number;
}

// Response จาก API /movies/:id
export type MovieDetailResponse = MovieDetailDto;
