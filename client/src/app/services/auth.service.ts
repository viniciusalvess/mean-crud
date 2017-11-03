import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

interface UserToken {
  nome: string;
  email: string;
  token: string;
}

@Injectable()
export class AuthService {

  private TOKEN_NAME: any = 'token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', {email: username, password: password })
      .map((response: UserToken) => {
          this.setToken(JSON.stringify(response));
      });
  }

  isAuthenticated(): boolean {
    return (!(this.getToken() === null));
  }

  getToken(): UserToken {
    const lh = localStorage.getItem(this.TOKEN_NAME);
    if (lh !== null) {
      return JSON.parse(lh);
    }
    return null;
  }

  setToken(aToken) {
      localStorage.setItem(this.TOKEN_NAME, aToken);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
