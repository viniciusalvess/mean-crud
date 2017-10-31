import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpService} from './http.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) { }

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', {email: username, password: password })
      .map((response: Response) => {
        const user = response.json();
        if (user && user._id) {
          this.setToken(JSON.stringify(user));
        }
      });
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token')).token;
  }

  setToken(aToken) {
    localStorage.setItem('token', aToken);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
