import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private httpService: HttpService) {}
  baseUrl = 'https://api.jikan.moe/v3/search';

  async searchString(query: string): Promise<AxiosResponse<any>> {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/anime?q=${query}`),
    );
    return result.data;
  }
}
