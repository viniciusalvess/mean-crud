import 'rxjs/add/operator/do';
import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth: AuthService;
  private router: Router;
  // private inj: Injector

  constructor(private inj: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.inj.get(AuthService);
    this.router = this.inj.get(Router);

    return next.handle(request).do((event: HttpEvent<any>) => {
      // if (event instanceof HttpResponse) {
      //   // do stuff with response if you want
      // }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigateByUrl('/login');
        }
      }
    });
  }
}
