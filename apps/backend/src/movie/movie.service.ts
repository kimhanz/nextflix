import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  private base = process.env.TMDB_API_BASE_URL;
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

      return { detail };
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
}
