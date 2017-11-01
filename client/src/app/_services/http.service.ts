import {Inject, Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthService} from './auth.service';

@Injectable()
export class HttpService extends Http {
  constructor(backend: XHRBackend, options: RequestOptions) {
    // const token = JSON.parse(localStorage.getItem('token')).token;
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    super(backend, options);
  }

  request(url: string | Request, options ?: RequestOptionsArgs): Observable<Response> {
    // const token = JSON.parse(localStorage.getItem('token')).token;
    const token = localStorage.getItem('token');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token}`);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', `Bearer ${token}`);
    }
    return super.request(url, options); // .catch(this.catchAuthError(this));
  }

  // private catchAuthError(self: HttpService) {
  //   // we have to pass HttpService's own instance here as `self`
  //   return (res: Response) => {
  //     // console.log(res);
  //     if (res.status === 401 || res.status === 403) {
  //       // if not authenticated
  //       // console.log('HttpService: ', res);
  //     }
  //     return Observable.throw(res);
  //   };
  // }
}
