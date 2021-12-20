import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlAPI } from 'src/environments/environment';
import { Poka } from '../models/Poka';

@Injectable({
  providedIn: 'root'
})
export class PokaService {

  url = urlAPI + 'pokas/'

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Poka[]>(this.url);
  }

  getById(id) {
    return this.http.get<Poka>(this.url + id)
  }

  post(poka: Poka): Observable<Poka> {
    return this.http.post<Poka>(this.url, poka);
  }

  put(id: number, poka: Poka): Observable<Poka> {
    console.log(id);
    return this.http.put<Poka>(this.url + id, poka);
  }

}
