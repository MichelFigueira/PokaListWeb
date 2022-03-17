import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PaginatedResult } from '@app/models/Pagination';
import { Poka } from '@app/models/Poka';
import { Group } from '@app/models/Group';

@Injectable({
  providedIn: 'root'
})
export class PokaService {

  
  urlPokas = environment.urlAPI + 'pokas/'
  urlGroups = environment.urlAPI + 'groups/'
  public newPokaEvent = new BehaviorSubject<string>("call");

  
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
    
    return this.http.get<Poka[]>(this.urlPokas, { observe: 'response', params })
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
    return this.http.get<Poka>(this.urlPokas + id)
  }

  getGroups() {
    return this.http.get<Group[]>(this.urlGroups);
  }
  
  post(poka: Poka): Observable<Poka> {
    return this.http.post<Poka>(this.urlPokas, poka);
  }
  
  put(id: number, poka: Poka) {
    return this.http.put<Poka>(this.urlPokas + id, poka);
  }
  
  pokaEvent(){
    this.newPokaEvent.next("call");
  }
}
