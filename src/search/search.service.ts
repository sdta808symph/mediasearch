import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private httpService: HttpService) {}
  baseUrl = 'https://api.jikan.moe/v3';
  imageSearchUrl = 'https://api.trace.moe/search?anilistInfo';

  async searchString(queryString: string): Promise<AxiosResponse<any>> {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/search/anime?q=${queryString}`),
    );
    return result.data;
  }

  async searchAnimeId(queryId: string): Promise<AxiosResponse<any>> {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/anime/${queryId}`),
    );
    return result.data;
  }

  async searchImage(queryImage: Express.Multer.File) {
    const requestConfig: AxiosRequestConfig = {
      headers: { 'Content-type': 'image/jpeg' },
    };
    const result = await lastValueFrom(
      this.httpService.post(
        `${this.imageSearchUrl}`,
        queryImage.buffer,
        requestConfig,
      ),
    );

    const closestResultMALId = result.data.result[0].anilist.idMal;

    return this.searchAnimeId(closestResultMALId);
  }
}
