import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

interface User{

}

@Injectable()
export class AuthService {

  private TOKEN_NAME: any = 'token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', {email: username, password: password })
      .map((response: Response) => {
          this.setToken(JSON.stringify(response));
      });
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(aToken) {
      localStorage.setItem(this.TOKEN_NAME, aToken);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
