import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private httpService: HttpService) {}
  baseUrl = 'https://api.myanimelist.net/v2';

  async searchString(query: string): Promise<Observable<AxiosResponse<any[]>>> {
    return await this.httpService.get(`${this.baseUrl}/anime?q=${query}`);
  }
}
