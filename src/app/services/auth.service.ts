import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  user = new BehaviorSubject(null);

  apiHost = "http://forum.mashuptest.com/api";

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  });

  signUp(name: string, email: string, password: string, password_confirmation: string) {
    const url = `${this.apiHost}/register`;
    return this.http.post(url, {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
  
    });
  }
  
  logIn(email: string, password: string) {
    const url = `${this.apiHost}/login`;
    const body = new HttpParams().set('email', email).set('password', password);
    return this.http.post(url, body.toString(),{
      headers: this.headers
    }).pipe(
      tap((data) => {
        const loginResp = {
          token: data.token,
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            created_at: data.user.created_at,
            updated_at: data.user.updated_at,
          },
        };
        localStorage.setItem('user', JSON.stringify(loginResp));
        this.user.next(loginResp);
      })
    );
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
  }
  
}


