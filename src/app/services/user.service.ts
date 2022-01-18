import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, take } from 'rxjs';

import { User } from '@app/models/User';
import { UserUpdate } from '@app/models/UserUpdate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  url = environment.urlAPI + 'user/'

  constructor(private http: HttpClient) { }

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.url + 'login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public register(model: any): Observable<void> {
    return this.http.post<User>(this.url + 'register', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public getUser(): Observable<UserUpdate> {
    return this.http.get<UserUpdate>(this.url + 'getUser').pipe(take(1));
  }

  updateUser(model: UserUpdate): Observable<void> {
    return this.http.put<UserUpdate>(this.url + 'updateUser', model).pipe(
      take(1),
      map((user: UserUpdate) => {
        console.log(user);
        this.setCurrentUser(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  postUpload(file: File): Observable<UserUpdate> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<UserUpdate>(this.url + 'upload-image', formData)
      .pipe(take(1)).pipe();
  }

}
