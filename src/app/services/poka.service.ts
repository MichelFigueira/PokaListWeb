import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlAPI } from 'src/environments/environment';
import { Poka } from '../models/Poka';

@Injectable({
  providedIn: 'root'
})
export class PokaService {

  constructor(private http: HttpClient) { }

  getPoka() {
    return this.http.get<Poka[]>(urlAPI + 'pokas');
  }

}
