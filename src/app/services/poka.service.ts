import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '@app/models/Pagination';
import { map, Observable, take } from 'rxjs';

import { urlAPI } from 'src/environments/environment';
import { Poka } from '@app/models/Poka';

@Injectable({
  providedIn: 'root'
})
export class PokaService {

  url = urlAPI + 'pokas/'

  constructor(private http: HttpClient) { }

  get(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Poka[]>> {
    const paginatedResult: PaginatedResult<Poka[]> = new PaginatedResult<Poka[]>()

    let params = new HttpParams;

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term !== null && term !== '') {
      params = params.append('term', term)
    }

    return this.http.get<Poka[]>(this.url, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;

          if(response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );

  }

  getById(id) {
    return this.http.get<Poka>(this.url + id)
  }

  post(poka: Poka): Observable<Poka> {
    return this.http.post<Poka>(this.url, poka);
  }

  put(id: number, poka: Poka) {
    
    return this.http.put<Poka>(this.url + id, poka);
  }

}
