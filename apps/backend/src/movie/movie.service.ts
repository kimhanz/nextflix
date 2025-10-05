import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  private base = 'https://api.themoviedb.org/3';
  private apiKey = process.env.TMDB_API_KEY;

  constructor(private http: HttpService) {}

  private headers() {
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  async popular(page = 1) {
    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.base}/movie/popular`, {
          headers: this.headers(),
          params: { language: 'en-US', page },
        }),
      );
      return data;
    } catch (e) {
      throw new InternalServerErrorException('Upstream error');
    }
  }

  async byId(id: string | number) {
    try {
      // movie detail
      const { data: detail } = await firstValueFrom(
        this.http.get(`${this.base}/movie/${id}`, {
          headers: this.headers(),
          params: { language: 'en-US' },
        }),
      );

      // certification
      const { data: releases } = await firstValueFrom(
        this.http.get(`${this.base}/movie/${id}/release_dates`, {
          headers: this.headers(),
        }),
      );

      // certification of US
      let certification: string | undefined;
      const usRelease = releases.results.find(
        (r: any) => r.iso_3166_1 === 'US',
      );
      if (usRelease?.release_dates?.length > 0) {
        certification = usRelease.release_dates[0].certification || undefined;
      }

      return { detail, certification };
    } catch {
      throw new InternalServerErrorException('Upstream error');
    }
  }

  async search(query: string, page = 1) {
    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.base}/search/movie`, {
          headers: this.headers(),
          params: { query, page, include_adult: false, language: 'en-US' },
        }),
      );
      return data;
    } catch {
      throw new InternalServerErrorException('Upstream error');
    }
  }

  async videos(id: string | number) {
    try {
      const { data } = await firstValueFrom(
        this.http.get(`${this.base}/movie/${id}/videos`, {
          headers: this.headers(),
          params: { language: 'en-US' },
        }),
      );
      return data;
    } catch {
      throw new InternalServerErrorException('Upstream error');
    }
  }
}
